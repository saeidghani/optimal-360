/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import budgetLogo from '../../../assets/images/budget-logo.jpg';

import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';

import { useQuery } from '../../../hooks/useQuery';
import { useHistory, useParams } from 'react-router-dom';

const OrganizationsStaff = ({ staffs, fetchOrganizationsStaffs, loading }) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const { organizationId } = useParams();

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);

  const pageNumber = parsedQuery?.page_number;

  React.useEffect(() => {
    const fetch = async () => {
      const newQuery = query || '?page_size=10&page_number=1';
      await fetchOrganizationsStaffs({ organizationId, query: newQuery });
    };
    fetch();
  }, [fetchOrganizationsStaffs, query]);

  const renderHeader = React.useCallback(
    () => {
      return selectedRows && selectedRows?.length > 0 ? (
        <div className="flex flex-row items-center">
          <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center">
          <div className="inline-flex flex-row items-center justify-between">
            <div className="w-10 h-10 rounded border-gray-200 rounded-full border relative">
              <img className="w-8 h-4 absolute top-0 mt-3 mx-1" src={budgetLogo} alt="" />
            </div>
            <p className="text-sm font-normal ml-2">Sime Darby Group Berhad</p>
          </div>
          <div className="flex flex-row">
            <Button
              size="middle"
              textSize="xs"
              text="Import Exel File"
              type="gray"
              className="mx-3 px-3 flex-row-reverse"
              textClassName="mr-2"
              icon="FileExcelOutlined"
            />
            <Button
              size="middle"
              textSize="xs"
              text="New Staff Member"
              type="gray"
              className="mx-3 px-3 flex-row-reverse"
              textClassName="mr-2"
              icon="UserAddOutlined"
              onClick={() => history.push(`/super-user/organizations/${organizationId}/new-staff`)}
            />
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [loading, selectedRows.length],
  );
  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const columns = React.useMemo(
    () => [
      {
        key: 'id',
        title: 'ID',
        sorter: true,
        sortOrder: getSortOrder('id'),
      },
      {
        key: 'name',
        title: 'Name',
      },
      {
        key: 'email',
        title: 'Email',
      },
      {
        key: 'password',
        title: 'Password',
      },
      {
        key: 'edit',
        title: '',
        render: () => (
          <Button
            size="middle"
            className="text-primary-500"
            type="link"
            icon="EditOutlined"
            iconPosition="right"
          />

        ),
      },
    ],
    // eslint-disable-next-line
    [],
  );

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  const dataSource = React.useMemo(
    () => (staffs?.data || []).map((item) => ({ ...item, key: `${item.id}` })),
    // eslint-disable-next-line
    [staffs.timeStamp],
  );
  return (
    <MainLayout
      titleClass="mb-6 mt-3"
      hasBreadCrumb
      title="Organizations"
      contentClass="py-6 pl-21 pr-6"
    >
      <Table
        onTableChange={({ sorter }) => sort(sorter)}
        size="middle"
        className="p-6 bg-white rounded-lg shadow"
        selectedRowKeys={selectedRows?.map((el) => el.key)}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        renderHeader={renderHeader}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setQuery({ page_size: size, page_number: 1 });
        }}
        pageSize={pageSize * 1}
        pageNumber={pageNumber * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) => {
          setSelectedRows([]);
          setQuery({
            page_size,
            page_number,
          });
        }}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        totalRecordSize={staffs?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

OrganizationsStaff.propTypes = {
  fetchOrganizationsStaffs: PropTypes.func.isRequired,
  staffs: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    timeStamp: PropTypes.number,
  }),
  loading: PropTypes.bool.isRequired,
};

OrganizationsStaff.defaultProps = {
  staffs: {
    data: [],
    timeStamp: '',
  },
};

export default OrganizationsStaff;
