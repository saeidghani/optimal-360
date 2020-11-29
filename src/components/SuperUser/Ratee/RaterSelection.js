import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { dynamicMap } from '../../../routes/RouteMap';
import MainLayout from '../../Common/Layout';
import Menu from './Helper/Menu';
import Steps from '../../Common/Steps';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';
import { useQuery, parse, stringify } from '../../../hooks/useQuery';

const RaterSelection = ({
  loading,
  fetchStaffForRater,
  staffForRater,
  fetchRaterGroups,
  raterGroups,
  setSelectedRaters,
  submitRaters,
  changedLog,
}) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const rateeId = parsedQuery?.rateeId;
  const projectId = parsedQuery?.projectId;
  const raterGroupId = parsedQuery?.raterGroupId?.toString() || raterGroups[0]?.id?.toString();
  const currentRaterGroupChangeLog = changedLog.find((el) => el.raterGroupId == raterGroupId);
  const defaultSelected = currentRaterGroupChangeLog?.isChanged
  ? currentRaterGroupChangeLog.selectedItems : currentRaterGroupChangeLog?.defaultItems;
  const staffQuery = stringify(parse({ q: parsedQuery.sq })) || '';

  useEffect(() => {
     fetchRaterGroups({ surveyGroupId, rateeId });
    //  setQuery({ raterGroupId: null });
  }, [fetchRaterGroups]);

  useEffect(() => {
    if (raterGroupId) {
      setQuery({ raterGroupId });
      fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query: staffQuery });
    }
  }, [raterGroupId, staffQuery]);
  console.log(staffForRater);
  const renderHeader = React.useCallback(
    () => {
      return (
        <div className="flex flex-row justify-start items-center">
          <div className="flex flex-row">
            <SearchBox
              onSearch={(e) => setQuery({ sq: e.target.value })}
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
      key: 'department',
      title: 'Department',
    },
    {
      key: 'jobDesignation',
      title: 'Job Designation',
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
      contentClass="pt-6"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <div className="bg-white grid grid-cols-12 pl-15">
        <Menu
          onClick={(id) => {
            fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId: id, query: staffQuery });
            setQuery({ raterGroupId: id });
          }}
          title="Rater Group"
          items={raterGroups}
          className="col-span-2"
        />
        <div className="px-6 py-5 col-start-3 col-span-10">
          <div className="w-2/6">
            <Steps steps={['Ratee Details', 'Rater Selection']} currentPosition={1} />
          </div>
          <Table
            size="middle"
            className="p-6 mt-5 bg-white rounded-lg max-w-screen-xl"
            renderHeader={renderHeader}
            loading={loading}
            columns={columns}
            dataSource={staffForRater || []}
            selectedRowKeys={defaultSelected?.map((el) => el.id)}
            onRowSelectionChange={(_, rows) => {
              setSelectedRaters({ rows, raterGpId: raterGroupId });
            }}
            pagination={false}
          />
          <div className="pt-23.5 pb-22 flex justify-end max-w-screen-xl">
            <Button
              className="w-24.5 h-9.5"
              type="link"
              text="Prev"
              onClick={() => history.goBack()}
            />
            <Button
              className="w-24.5 h-9.5"
              text="Submit"
              onClick={async () => {
                try {
                  await submitRaters({ surveyGroupId, rateeId, raterGroupId: parseInt(raterGroupId), projectId });

                  const params = stringify({ surveyGroupId, projectId });
                  const path = `${dynamicMap.superUser.ratersList()}${params}`;
                  history.push(path);
              } catch (error) { }
              }
             }
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
  staffForRater: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRaterGroups: PropTypes.func.isRequired,
  raterGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedRaters: PropTypes.func.isRequired,
  submitRaters: PropTypes.func.isRequired,
  changedLog: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RaterSelection.defaultProps = {};

export default RaterSelection;
