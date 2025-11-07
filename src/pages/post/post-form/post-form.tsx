import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { PostFormProps, PostPutResponse } from "../../../types";
import './post-form.css';

type Inputs = {
  title:     string;
  body:      string;
  userId:    number;
  tags:      string;
}

export default function PostForm(props: PostFormProps) {
  const { onSave } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: props,
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if(props.postId === 0) {
      return;
    } else {
      axios.put<PostPutResponse>(`https://dummyjson.com/posts/${props.postId}`, 
        {...data, 
          userId: +data.userId,
          tags: data.tags.split(',')
        })
      .then(response => {
        if(onSave) {
          onSave(response.data);
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
