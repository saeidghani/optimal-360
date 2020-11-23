import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../../../hooks';

import { fetchFullURL } from '../../../lib/utils';

import { dynamicMap } from '../../../routes/RouteMap';

import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';

const Organizations = ({ organizations, fetchOrganizations, loading }) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();

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
    fetchOrganizations(query);
  }, [fetchOrganizations, query]);

  const renderHeader = React.useCallback(
    () => (
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row">
          <SearchBox
            className="text-xs"
            loading={loading}
            onSearch={(val) => setQuery({ q: val })}
            onPressEnter={(e) => setQuery({ q: e.target.value })}
          />
          <Button
            size="middle"
            textSize="xs"
            text="New Organization"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="BankOutlined"
            iconPosition="right"
            onClick={() => history.push(dynamicMap.superUser.addOrganization())}
          />
        </div>
      </div>
    ),
    // eslint-disable-next-line
    [],
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
        width: 200,
        sortOrder: getSortOrder('id'),
        render: (id, { logo }) => (
          <div className="flex items-center justify-between">
            <div>{id}</div>
            <div className="w-10 h-10 rounded border-gray-200 rounded-full border relative">
              <img className="rounded-full w-10 h-10" src={fetchFullURL(logo)} alt="logo" />
            </div>
          </div>
        ),
      },
      {
        key: 'name',
        title: 'Organization',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (organization) => {
          return (
            <div className="inline-flex flex-row items-center justify-between">
              <p className="text-sm font-normal ml-2">{organization}</p>
            </div>
          );
        },
      },
      {
        key: 'project',
        title: '',
        width: 100,
        render: (_, { id: organizationId }) => (
          <Button
            onClick={() => {
              const path = dynamicMap.superUser.organizationStaffList({ organizationId });

              history.push(`${path}?page_number=1&page_size=10`);
            }}
            icon="TeamOutlined"
            textClassName="ml-2"
            text="Staff"
            textSize="sm"
            type="link"
            className="text-lg mr-7"
            size="middle"
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
        loading={loading}
        columns={columns}
        rowSelection={false}
        dataSource={organizations?.data || []}
        renderHeader={renderHeader}
        onPageSizeChange={(size) => {
          setQuery({ page_size: size, page_number: 1 });
        }}
        pageSize={(parsedQuery?.page_size || 10) * 1}
        pageNumber={parsedQuery?.page_number * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) => {
          setQuery({
            page_size,
            page_number,
          });
        }}
        totalRecordSize={organizations?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

Organizations.propTypes = {
  fetchOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
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
  loading: PropTypes.bool.isRequired,
};

Organizations.defaultProps = {
  organizations: {
    data: [],
    timeStamp: '',
  },
};

export default Organizations;
