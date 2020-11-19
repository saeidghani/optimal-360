import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../Common/Layout';
import Menu from '../Wizard/Helper/Menu';
import Steps from '../../Common/Steps';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';
import { useQuery, parse, stringify } from '../../../hooks/useQuery';

const RaterSelection = ({
  loading,
  fetchStaffForRater,
  staffForRatee,
  fetchRaterGroups,
  raterGroups,
}) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const rateeId = parsedQuery?.rateeId;
  const raterGroupId = raterGroups[0]?.id?.toString();
  const defaultSelectedRows = staffForRatee?.filter((el) => el.relationId);
  const staffQuery = stringify(parse({ q: parsedQuery.sq }));

  useEffect(() => {
     fetchRaterGroups({ surveyGroupId });
     if (raterGroupId) {
      fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query: staffQuery });
     }
  }, [query, fetchRaterGroups, raterGroupId, parsedQuery.sq]);

  useEffect(() => {
    setSelectedRows(defaultSelectedRows);
  }, [staffForRatee]);

  const renderHeader = React.useCallback(
    () => {
      return (
        <div className="flex flex-row justify-start items-center">
          <div className="flex flex-row">
            <SearchBox
              className="text-xs"
              placeholder="SEARCH"
              loading={loading}
              onChange={(e) => setQuery({ sq: e.target.value })}
            />
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [loading,parsedQuery.sq],
  );

  const columns = React.useMemo(() => [
    {
      key: 'id',
      title: 'ID',
    },
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'email',
      title: 'Email',
    },
  ]);

  return (
    <MainLayout
      hasBreadCrumb
      title="Super User"
      titleClass="mb-6 mt-3"
      contentClass="py-6"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      {/* <Loading visible={loading} /> */}

      <div className="bg-white grid grid-cols-12 pl-15">
        <Menu
          onClick={(id) => fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId: id })}
          title="Rater Group"
          items={raterGroups}
          className="col-span-2"
        />

        <div className="px-6 py-5 col-start-3 col-span-10  ">
          <Steps className="block" steps={['Ratee Details', 'Rater Selection']} currentPosition={1} />
          <Table
            size="middle"
            className="p-6 mt-5 bg-white rounded-lg"
            renderHeader={renderHeader}
            loading={loading}
            columns={columns}
            dataSource={staffForRatee || []}
            selectedRowKeys={selectedRows?.map((el) => el.id)}
            onRowSelectionChange={(_, rows) => {
              setSelectedRows(rows);
            }}
            pagination={false}
          />
          <div className="pt-23.5 pb-22 flex justify-end">
            <Button
              className="w-24.5 h-9.5"
              type="link"
              text="Prev"
              onClick={() => history.goBack()}
            />
            <Button
              className="w-24.5 h-9.5"
              text="Submit"
              onClick={() => {
               // TODO submit rateeSelection
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

RaterSelection.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchStaffForRater: PropTypes.func.isRequired,
  staffForRatee: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRaterGroups: PropTypes.func.isRequired,
  raterGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RaterSelection.defaultProps = {};

export default RaterSelection;
