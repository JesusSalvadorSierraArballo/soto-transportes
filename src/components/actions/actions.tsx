import { Button, } from "primereact/button";

interface EditButtonTemplateProps<T> {
  onEdit: (data: T) => void;
  onCancel: (data: T) => void;
  onView: (data: T) => void;
  data: T;
}

export function EditButtonTemplate<T>(props: EditButtonTemplateProps<T>) {
  const { onEdit, onCancel, onView, data } = props;
  return (
    <>
      <Button
        label="Editar"
        className="p-button-sm"
        onClick={() => onEdit(data)}
      ></Button> 
      <Button
        label="Ver"
        className="p-button-sm"
        onClick={() => onView(data)}
        severity="secondary"
      ></Button> 
      <Button
        label="Cancelar"
        className="p-button-sm"
        onClick={() => onCancel(data)}
        severity="warning"
      ></Button> 
  </>
);
}