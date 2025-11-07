import axios from 'axios';
import { FilterMatchMode } from 'primereact/api';
import { Column, type ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { EditButtonTemplate } from '../../components/actions/actions';
import { GetSingleUserResponseToUserBasicInfo } from '../../mappers/users/users';
import type { GetAllPostResponse, GetSingleUserResponse, Post, UserBasicInfo } from '../../types';
import './post.css';

type DisplayedPost = {
    id: number;
    title: string;
    userID: number;
    userName: string | undefined;
    tags: string;
    reactions: string;
}

function Post() {

  const [post, setPost] = useState<Post[]>([]);
  const [users, setUsers] = useState<UserBasicInfo[]>([]);
  const toast = useRef<any>(null);

  let displayedPosts: DisplayedPost[] = post.map((post) => (
    {
      id: post.id,
      title: post.title,
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
  
  let userFilterOptions = users.map(user => ({ label: user.firstName, id: user.id }));
  let tagsFilterOptions = [... new Set(post.map(({tags}) => tags).flat())].map(tag => ({ id: tag, name: tag }));

  useEffect(() => {
    const fetchData = async () => {
      axios.get<GetAllPostResponse>('https://dummyjson.com/posts?limit=10&skip=0').then(async response => {
        setPost(response.data.posts);
        let userIds = [... new Set(response.data.posts.map(p => p.userId))];
        userIds = userIds.filter(id => !users.some(user => user.id === id));

        const usersData = await Promise.all<GetSingleUserResponse>(
            userIds.map(async (id) => {
              const res = await axios.get(`https://dummyjson.com/users/${id}`);
              return res.data;
            })
          );
          setUsers(usersData.map(GetSingleUserResponseToUserBasicInfo))
      });
    };    
    
    fetchData();
  }, []);

  const onCancel = (d: DisplayedPost) => {
    console.log(d);
    toast.current.show({ severity: 'info', summary: 'Info', detail: `Post ID: ${d.id} Titulo: ${d.title}` });
  };
  const onView = (d: DisplayedPost) => {
    console.log(d);
    toast.current.show({ severity: 'info', summary: 'Info', detail: `Post ID: ${d.id} Titulo: ${d.title}` });
  };
  const onEdit = (d: DisplayedPost) => {
    console.log(d);
    toast.current.show({ severity: 'info', summary: 'Info', detail: `Post ID: ${d.id} Titulo: ${d.title}` });
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
  
  return (
    <>
      <h1>Post Page</h1>
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

    </>
  );
}

export default Post;
