/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import organizationImg from '../../../assets/images/survey-groups-organization.jpg';

import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';

import { useQuery } from '../../../hooks/useQuery';
import { useHistory } from 'react-router-dom';

const Organizations = ({ fetchOrganizations, loading }) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const [organizations, setOrganizations] = React.useState({});

  const pageNumber = parsedQuery?.page_number;

  React.useEffect(() => {
    const fetch = async () => {
      const newQuery = query || '?page_size=10&page_number=1';
      fetchOrganizations(newQuery).then((response) => {
        setOrganizations(response?.data);
      });
    };
    fetch();
  }, [query]);

  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
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
            onClick={() => history.push('/super-user/organizations/new')}
          />
        </div>
      </div>
    );
  }, [loading, selectedRows.length]);

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const columns = React.useMemo(() => [
    {
      key: 'id',
      title: 'ID',
      sorter: true,
      sortOrder: getSortOrder('id'),
    },
    {
      key: 'name',
      title: 'Organization',
      sorter: true,
      sortOrder: getSortOrder('name'),
      render: (organization) => (
        <div className="inline-flex flex-row items-center justify-between">
          <div className="w-10 h-10 rounded border-gray-200 rounded-full border relative">
            <img className="w-8 h-4 absolute top-0 mt-3 ml-1" src={organizationImg} alt="" />
          </div>
          <p className="text-sm font-normal ml-2">{organization}</p>
        </div>
      ),
    },
    {
      key: 'project',
      title: '',
      width: 100,
      render: (_data, { id }) => (
        <Button
          onClick={() => history.push(`/super-user/organizations/${id}`)}
          icon="TeamOutlined"
          text="&nbsp;Staff"
          textSize="sm"
          type="link"
          className="text-lg mr-7"
          size="middle"
        />
      ),
    },
  ]);

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  const dataSource = React.useMemo(
    () => (organizations?.data || []).map((item) => ({ ...item, key: `${item.id}` })),
    // eslint-disable-next-line
    [organizations.timeStamp],
  );
  return (
    <MainLayout
      titleClass="mb-6 mt-3"
      hasBreadCrumb
      title="Super User"
      contentClass="py-6 pl-21 pr-6"
    >
      <Table
        onTableChange={({ sorter }) => sort(sorter)}
        size="middle"
        className="p-6 bg-white rounded-lg shadow"
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
        totalRecordSize={organizations?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

Organizations.propTypes = {
  fetchOrganizations: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

Organizations.defaultProps = {};

export default Organizations;
