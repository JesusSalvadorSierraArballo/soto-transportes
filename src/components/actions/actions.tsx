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
        className="p-button-sm"
        title="Editar post"
        icon="pi pi-pen-to-square"
        onClick={() => onEdit(data)}
      ></Button> 
      <Button
        icon="pi pi-file-pdf"
        title="Ver pdf"
        className="p-button-sm"
        onClick={() => onView(data)}
        severity="secondary"
      ></Button> 
      <Button
        icon="pi pi-trash"
        title="Cancelar post"
        className="p-button-sm"
        onClick={() => onCancel(data)}
        severity="warning"
      ></Button> 
  </>
);
}