import React from 'react';
// import { DeleteOutlined } from '@ant';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '../../../hooks';
import { dynamicMap } from '../../../routes/RouteMap';
import { fetchFullURL } from '../../../lib/utils';
import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import ImportExcelButton from '../../Common/ImportExcelButton';

const OrganizationsStaff = ({
  importStaff,
  organizationsInfo,
  staff,
  fetchOrganizationsInfo,
  fetchOrganizationsStaff,
  loading,
  deleteStaff,
}) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const { organizationId } = useParams();
  const [selectedRows, setSelectedRows] = React.useState([]);

  React.useEffect(() => {
    if (!parsedQuery?.page_number || !parsedQuery?.page_size) {
      setQuery({
        page_number: 1,
        page_size: 10,
      });
    }
    // eslint-disable-next-line
  }, [history?.location?.pathname]);

  React.useEffect(() => {
    fetchOrganizationsStaff({ organizationId, query });
  }, [fetchOrganizationsStaff, organizationId, query]);

  React.useEffect(() => {
    fetchOrganizationsInfo(organizationId);
  }, [fetchOrganizationsInfo, organizationId]);

  // React.useEffect(() => {
  //   const left = document.querySelector('thead');
  //   const stop = (left?.offsetParent?.offsetTop + 200);
  //   const handleScroll = () => {
  //     const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  //     if (scrollTop >= stop) {
  //       left.classList.add('scroll');
  //     } else {
  //       left.classList.remove('scroll');
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const renderHeader = React.useCallback(() => {
    return (
      <div className="flex flex-row justify-between items-center">
        <div className="inline-flex flex-row items-center justify-between">
          <div className="w-10 h-10 rounded border-gray-200 rounded-full border relative">
            <img
              className="rounded-full w-10 h-10"
              src={fetchFullURL(organizationsInfo.logo)}
              alt="logo"
            />
          </div>

          <p className="text-sm text-base font-normal ml-2">{organizationsInfo.name}</p>
          {
            selectedRows?.length > 0 ? (
              <div className="inline-flex flex-row items-center justify-between">
                <Button
                  onClick={async () => {
                    await deleteStaff({ organizationId, staffIds: selectedRows.map((el) => el.id) });
                    setSelectedRows([]);
                  }}
                  size="middle"
                  className="text-base flex flex-row justify-center ml-8 mr-4 items-center
            text-primary-500 bg-primary-500 bg-opacity-8 w-8 h-8"
                  icon="DeleteOutlined"
                />
                <p className="text-sm text-base font-normal">selected {selectedRows.length} items </p>
              </div>
            ) : null
          }
        </div>
        <div className="flex flex-row">
          <ImportExcelButton
            beforeUpload={(file) => {
              importStaff({ organizationId, file });

              return false;
            }}
          />

          <Button
            size="middle"
            textSize="xs"
            text="New Staff Member"
            type="gray"
            className="mx-3 px-3 flex-row-reverse"
            textClassName="mr-2"
            icon="UserAddOutlined"
            onClick={() => {
              const path = dynamicMap.superUser.addOrganizationStaff({
                organizationId,
              });

              history.push(path);
            }}
          />
        </div>
      </div>
    );
  }, [selectedRows.length, organizationsInfo]);

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const columns = [
    {
      key: 'id',
      title: 'ID',
      sorter: true,
      width: '15%',
      sortOrder: getSortOrder('id'),
    },
    {
      key: 'name',
      title: 'Name',
      width: '30%',
      sorter: true,
      sortOrder: getSortOrder('name'),
    },
    {
      key: 'department',
      title: 'Department',
      width: '20%',
    },
    {
      key: 'jobDesignation',
      title: 'Job Designation',
      width: '22%',
    },
    {
      key: 'email',
      title: 'Email',
      width: '30%',
    },
    {
      key: 'password',
      title: 'Password',
      render: (password) => <span className="whitespace-pre">{password}</span>,
    },
    {
      key: 'edit',
      title: '',
      width: 50,
      render: (_, { id: staffId }) => (
        <Button
          size="middle"
          className="text-primary-500"
          type="link"
          icon="EditOutlined"
          iconPosition="right"
          onClick={() => {
            const path = dynamicMap.superUser.organizationStaffEdit({
              organizationId,
              staffId,
            });

            history.push(path);
          }}
        />
      ),
    },
  ];

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  return (
    <MainLayout
      titleClass="mb-6 mt-3"
      breadCrumbItems={['Organizations', 'Users']}
      title="Staff"
      contentClass="py-6 pl-21 pr-6"
    >
      <Table
        onTableChange={({ sorter }) => sort(sorter)}
        renderHeader={renderHeader}
        size="middle"
        className="p-6 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        selectedRowKeys={selectedRows?.map((el) => el.id)}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        dataSource={staff?.data || []}
        onPageSizeChange={(size) => setQuery({ page_size: size, page_number: 1 })}
        pageSize={(parsedQuery?.page_size || 10) * 1}
        pageNumber={parsedQuery?.page_number * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) => {
          setQuery({
            page_size,
            page_number,
          });
        }}
        totalRecordSize={staff?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

OrganizationsStaff.propTypes = {
  importStaff: PropTypes.func.isRequired,
  fetchOrganizationsStaff: PropTypes.func.isRequired,
  fetchOrganizationsInfo: PropTypes.func.isRequired,
  staff: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
    timeStamp: PropTypes.number,
  }),
  organizationsInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    logo: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  deleteStaff: PropTypes.func.isRequired,
};

OrganizationsStaff.defaultProps = {
  staff: {
    data: [],
    timeStamp: '',
  },
  organizationsInfo: {},
};

export default OrganizationsStaff;
