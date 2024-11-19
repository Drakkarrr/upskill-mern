export const fields = {
  fullname: {
    type: 'string',
  },
  phone: {
    type: 'phone',
  },
  client: {
    type: 'search',
    label: 'client',
    entity: 'client',
    redirectLabel: 'Add New Client',
    withRedirect: true,
    urlToRedirect: '/customer',
    displayLabels: ['name', 'phone'],
    searchFields: 'name',
    dataIndex: ['client', 'name'],
  },
};
