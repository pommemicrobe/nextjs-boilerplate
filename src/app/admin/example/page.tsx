import Breadcrumb from '@/components/admin/breadcrumb/breadcrumb';
import H1 from '@/components/admin/heading/h1';
import H2 from '@/components/admin/heading/h2';
import H3 from '@/components/admin/heading/h3';
import H4 from '@/components/admin/heading/h4';
import H5 from '@/components/admin/heading/h5';
import H6 from '@/components/admin/heading/h6';
import Table from '@/components/admin/table/table';

const breadcrumb: any[] = [
  {
    name: 'Example',
  },
];

const table = {
  headers: ['ID', 'Name', 'Email', 'Role', 'Status', 'Actions'],
  rows: [
    [1, 'John Doe', 'john.doe@example.com', 'Admin', 'Active', 'Actions'],
    [2, 'Jane Doe', 'jane.doe@example.com', 'User', 'Active', 'Actions'],
  ],
};

export default function Example() {
  return (
    <>
      <Breadcrumb breadcrumb={breadcrumb} />

      <div className="p-4 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <H1 title="Example h1" />
        <H2 title="Example h2" />
        <H3 title="Example h3" />
        <H4 title="Example h4" />
        <H5 title="Example h5" />
        <H6 title="Example h6" />
      </div>

      <div className="p-4 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <Table table={table} />
      </div>
    </>
  );
}
