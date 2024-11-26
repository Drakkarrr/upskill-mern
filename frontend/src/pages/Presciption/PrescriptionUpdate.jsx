import useLanguage from '@/locale/useLanguage';
import UpdatePrescriptionModule from '@/modules/PrescriptionModule/UpdatePrescriptionModule';

export default function PrescriptionUpdate() {
  const translate = useLanguage();

  const entity = 'prescription';

  const Labels = {
    PANEL_TITLE: translate('prescription'),
    DATATABLE_TITLE: translate('prescription_list'),
    ADD_NEW_ENTITY: translate('add_new_prescription'),
    ENTITY_NAME: translate('prescription'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <UpdatePrescriptionModule config={configPage} />;
}
