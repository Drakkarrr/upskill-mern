import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Patients() {
  const translate = useLanguage();
  const entity = 'patients';
  const searchConfig = {
    displayLabels: ['fullname'],
    searchFields: 'fullname',
  };
  const deleteModalLabels = ['fullname'];

  const Labels = {
    PANEL_TITLE: 'Patients',
    DATATABLE_TITLE: 'Patients List',
    ADD_NEW_ENTITY: 'Add New Patient',
    ENTITY_NAME: 'Patients',
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
