import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { PostFormProps, PostPostResponse, PostPutResponse } from "../../../types";
import './post-form.css';

type Inputs = {
  title:     string;
  body:      string;
  userId:    number;
  tags:      string;
}

export default function PostForm(props: PostFormProps) {
  const { onUpdate, onNew } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: props,
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if(props.postId === 0) {
      axios.post<PostPostResponse>('https://dummyjson.com/posts/add', {
        title: data.title,
        body: data.body,
        userId: +data.userId,
        tags: data.tags.split(',')
      }).then(response => {
        const {data} = response
        if(onNew) {
          onNew(
           {
             id: data.id,
             title: data.title,
             body: data.body,
             userId: +data.userId,
             tags: data.tags,
             reactions: {
               likes: 0,
               dislikes: 0
             }
           }
          )
        }
      })

    } else {
      axios.put<PostPutResponse>(`https://dummyjson.com/posts/${props.postId}`, 
        {...data, 
          userId: +data.userId,
          tags: data.tags.split(',')
        })
      .then(response => {
        if(onUpdate) {
          onUpdate(response.data);
        }
      })
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="form-control">
          <span>Title:</span>
          <InputText
            className="input-field"
            {...register("title")}
          />
        </label>
      </div>
      <div>
        <label className="form-control">
          <span>Body</span>
          <InputTextarea 
            className="input-field"
            {...register("body")}
          />
        </label>
      </div>
      <div>
        <label className="form-control">
          <span>User:</span>
          <InputText
            className="input-field"
            {...register("userId")}
          />
        </label>
      </div>
      <div>
        <label className="form-control">
          <span>Tags:</span>
          <InputText
            className="input-field"
            {...register("tags")}
          />
        </label>
      </div>
        
      <Button type="submit" label="Guardar" />
              
    </form>
  )
}
