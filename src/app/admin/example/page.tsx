'use client';

import Breadcrumb from '@/components/admin/breadcrumb/breadcrumb';
import Checkbox from '@/components/admin/form/checkbox';
import Input from '@/components/admin/form/input';
import InputFile from '@/components/admin/form/inputFile';
import Select from '@/components/admin/form/select';
import Textarea from '@/components/admin/form/textarea';
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

      <div className="p-4 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <Input
          label="Name"
          name="name"
          placeholder="name"
          onChange={ev => {
            console.log(ev.currentTarget.value);
          }}
          errorMessage="This is an error message"
        />

        <InputFile
          label="File"
          name="file"
          files={[
            {
              id: 1,
              name: 'file1',
              src: 'https://fastly.picsum.photos/id/357/200/200.jpg?hmac=hHhE00vBpBPSjAiUhwzFKQi9PsCWu7sblLKC2rT6Fn8',
              type: 'image/jpg',
            },
            {
              id: 2,
              name: 'file2',
              src: 'https://fastly.picsum.photos/id/876/200/200.jpg?hmac=XKoZLM866KBZwrT4IBuHbiUOfu0kh_qSWT6mitQyYQo',
              type: 'image/jpg',
            },
            {
              id: 3,
              name: 'file3',
              src: 'https://pdfobject.com/pdf/sample.pdf',
              type: 'application/pdf',
            },
            {
              id: 4,
              name: 'file4',
              src: 'https://file-examples.com/storage/fe519944ff66ba53b99c446/2017/04/file_example_MP4_480_1_5MG.mp4',
              type: 'video/mp4',
            },
          ]}
          onChange={ev => {
            console.log(ev.currentTarget.files);
          }}
          onDelete={id => {
            console.log(id);
          }}
        />

        <Textarea
          label="Description"
          name="description"
          placeholder="description"
          errorMessage="This is an error message"
        />

        <Select
          label="Select"
          name="select"
          placeholder="Select an element"
          values={[
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
        />

        <Checkbox
          label="Checkbox"
          name="checkbox"
          values={[
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
        />
      </div>
    </>
  );
}
