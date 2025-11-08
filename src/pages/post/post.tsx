import { PDFViewer } from '@react-pdf/renderer';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column, type ColumnFilterElementTemplateOptions } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { EditButtonTemplate } from '../../components/actions/actions';
import { PostPDF } from '../../docs/post';
import axiosJWT from '../../interceptors/jwt';
import { GetSingleUserResponseToUserBasicInfo } from '../../mappers/users/users';
import type { DisplayedPost, GetAllPostResponse, GetSingleUserResponse, Post, PostDeleteResponse, PostFormProps, PostPostResponse, PostPutResponse, UserBasicInfo } from '../../types';
import PostForm from './post-form/post-form';
import './post.css';

function Post() {

  const defaultPost: PostFormProps = {
    postId: 0,
    title: "",
    body: "",
    userId: 0,
    tags: "",
  }

  const [post, setPost] = useState<Post[]>([]);
  const [users, setUsers] = useState<UserBasicInfo[]>([]);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [isDialogViewerVisible, setIsDialogViewerVisible] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<PostFormProps>(defaultPost);
  const toast = useRef<any>(null);


    useEffect(() => {
      axiosJWT.get<GetAllPostResponse>('https://dummyjson.com/posts?limit=10&skip=0').then(async response => {
        setPost(response.data.posts);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let userIds = [... new Set(post.map(p => p.userId))];
      userIds = userIds.filter(id => !users.some(user => user.id === id));

      const usersData = await Promise.all<GetSingleUserResponse>(
        userIds.map(async (id) => {
          const res = await axiosJWT.get(`https://dummyjson.com/users/${id}`);
          return res.data;
        })
      );
      setUsers(prev => [...prev, ...usersData.map(GetSingleUserResponseToUserBasicInfo)]);
    };    
    
    fetchData();
    
  }, [post]);

  const displayedPosts: DisplayedPost[] = post.map((post) => (
    {
      id: post.id,
      title: post.title,
      body: post.body,
      userID: post.userId,
      userName: users.find(user => user.id === post.userId)?.firstName,
      tags: post.tags.join(', '),
      reactions: `Likes: ${post.reactions.likes}, Dislikes: ${post.reactions.dislikes}`,
    }
  ));

  const filters: Partial<Record<keyof DisplayedPost, { value: any, matchMode: FilterMatchMode }>> = {
    userID: {
      value: null,
      matchMode: FilterMatchMode.EQUALS
    },
    tags: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS
    }
  };
  
  const userFilterOptions = users.map(user => ({ label: user.firstName, id: user.id }));
  const tagsFilterOptions = [... new Set(post.map(({tags}) => tags).flat())].map(tag => ({ id: tag, name: tag }));



  const onCancel = (d: DisplayedPost) => {
    confirmDialog({
      message: `Are you sure you want to cancel the post?`,
      header: `Cancel Post: ${d.title}`,
      accept: () => {
        axiosJWT.delete<PostDeleteResponse>(`https://dummyjson.com/posts/${d.id}`).then(response => {
          const postDeleted = response.data;
          toast.current.show({ severity: 'info', summary: 'Info', detail: `Post cancelled` });
          setPost(prevPosts => prevPosts.filter(p => p.id !== postDeleted.id));
        })
      },
    });
  };
  
  const onView = (d: DisplayedPost) => {

    setIsDialogViewerVisible(true)

    setCurrentPost({
      postId: d.id,
      title: d.title,
      body: d.body,
      userId: d.userID,
      tags: d.tags,
    });

    toast.current.show({ severity: 'info', summary: 'Info', detail: `Post ID: ${d.id} Titulo: ${d.title}` });
  };

  const onEdit = (d: DisplayedPost) => {
    setIsDialogVisible(true);
    setCurrentPost({
      postId: d.id,
      title: d.title,
      body: d.body,
      userId: d.userID,
      tags: d.tags,
    });
  };

  const afterUpdatePost = (updatedPost: PostPutResponse) => {
    setPost((prevPosts) => {
      return prevPosts.map(p => p.id === updatedPost.id ? {
        id: p.id,
        title: updatedPost.title,
        body: updatedPost.body,
        userId: updatedPost.userId,
        tags: updatedPost.tags,
        reactions: p.reactions,
        views: p.views,
      } : p);
    });

    setIsDialogVisible(false);
    toast.current.show({ severity: 'success', summary: 'Success', detail: `Post updated` });
  }
  const afterSavePost = (updatedPost: PostPostResponse) => {
    setPost((prevPosts) => [
      ...prevPosts,
      {
        id: updatedPost.id,
        title: updatedPost.title,
        body: updatedPost.body,
        tags: updatedPost.tags,
        reactions: {
          dislikes: 0,
          likes: 0,
        },
        views: 0,
        userId: updatedPost.userId,
      },
    ]);

    setIsDialogVisible(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `Post ${updatedPost.title} Create`,
    });
  };

const buttonGroupTemplate = (data: DisplayedPost) => (  
    <EditButtonTemplate
      onEdit={() => onEdit(data)}
      onCancel={() => onCancel(data)}
      onView={() => onView(data)}
      data={data}
    />
);

  const tagFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <MultiSelect
        value={options.value}
        options={tagsFilterOptions}
        itemTemplate={(option) => <span>{option.name}</span>}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="select tags"
        optionLabel="name"
        // optionValue="name"
      />
    );
  };

const userFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  return (
    <Dropdown
      value={options.value}
      options={userFilterOptions}
      itemTemplate={(option) => <span>{option?.label}</span>}
      onChange={(e) =>  options.filterApplyCallback(e.value.id)}
      placeholder="Seleccione un usuario"
      // optionLabel="label"
      // optionValue="id"
      // showClear
    />
  );
};

const onNewPost = () => {
  setCurrentPost(defaultPost);
  setIsDialogVisible(true);
}
  
  return (
    <>
      <header><h1>Post Page</h1> <Button title="Nuevo Post" icon="pi pi-plus-circle" onClick={onNewPost} /></header>
      <DataTable value={displayedPosts} 
        dataKey="id" 
        filterDisplay="row"  
        paginator rows={3} 
        filters={filters}
        tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Titulo"></Column>
        <Column
          field="userName" 
          header="Usuario" 
          filter 
          filterField='userID' 
          filterElement={userFilterTemplate}></Column>
        <Column 
          field="tags" 
          header="Tags"
          filter
          filterField='tags'
          filterElement={tagFilterTemplate}
        ></Column>
        <Column field="reactions" header="Reacciones"></Column>
        <Column field="actions" header="Editar" body={buttonGroupTemplate}></Column>
      </DataTable>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Dialog header="Edit post: " visible={isDialogVisible} onHide={() => {if (!isDialogVisible) return; setIsDialogVisible(false); }}>
        <PostForm 
          postId={currentPost.postId} 
          title={currentPost.title} 
          body={currentPost.body} 
          userId={currentPost.userId} 
          tags={currentPost.tags} 
          onUpdate={afterUpdatePost}
          onNew={afterSavePost}
          />
      </Dialog>
      <Dialog header="PDF" visible={isDialogViewerVisible} onHide={() => {if (!isDialogViewerVisible) return; setIsDialogViewerVisible(false); }} style={{ width: '50vw', height:'80vh' }}>
        <PDFViewer height={'100%'} width={'100%'}>
          <PostPDF 
            title={currentPost.title}
            body={currentPost.body}
            tags={currentPost.tags} 
            id={currentPost.postId} 
            userID={currentPost.userId} 
            userName={''} 
            reactions={''}          />
        </PDFViewer>
      </Dialog>

    </>
  );
}

export default Post;
