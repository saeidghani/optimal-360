import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../Common/Layout';
import Steps from '../../Common/Steps';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import { useQuery, parse, stringify } from '../../../hooks/useQuery';
import AutoComplete from '../../Common/AutoComplete';
import { dynamicMap } from '../../../routes/RouteMap';

const AddRatee = ({
  loading,
  fetchRateeMissionCriticals,
  addMissionCriticalToRatee,
  rateeMissionCriticals,
  fetchStaff,
  staffs,
  setStaff,
  fetchOrganizationId,
  }) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState();

  const surveyGroupId = parsedQuery?.surveyGroupId;
  const projectId = parsedQuery?.projectId;

  useEffect(() => {
    const defaultSelectedRows = rateeMissionCriticals?.filter((el) => el.isMissionCritical);
    setSelectedRows(defaultSelectedRows);
  }, [rateeMissionCriticals]);

  useEffect(() => {
    const staffQuery = stringify(parse({ q: parsedQuery.sq }));
    fetchStaff({ surveyGroupId, query: staffQuery });
     // TODO clear staffs
  }, [query, fetchStaff, parsedQuery.sq]);

  const handleClickAddNewStaff = useCallback(async () => {
    const organizationId = await fetchOrganizationId({ projectId });
    history.push(`/super-user/organizations/${organizationId}/new-staff`);
  }, [fetchOrganizationId]);

  const handleSelectStaff = ({ id }) => {
    setSelectedStaffId(id);
    fetchRateeMissionCriticals({ surveyGroupId, rateeId: id });
  };

  const handleClickNextStep = useCallback(async () => {
    const competencyIds = selectedRows.map((item) => item.competencyId);
     if (selectedStaffId) {
      await setStaff({ surveyGroupId, rateeId: selectedStaffId });
      await addMissionCriticalToRatee({ surveyGroupId, rateeId: selectedStaffId, competencyIds });
     }
     const params = stringify({ surveyGroupId, rateeId: selectedStaffId, projectId });
     const path = `${dynamicMap.superUser.raterSelection()}${params}`;
     history.push(path);
    // TODO  where is to push ? hesam history.push(buttonLinks.next)
  }, [selectedRows],
  );

  const renderHeader = React.useCallback(
     () => {
        return (
          <div className="flex flex-row justify-start items-center">
            <div className="flex flex-row">
              <span className="w-48">
                <AutoComplete
                  size="middle"
                  loading={loading}
                  placeholder="Name of Staff"
                  options={
                    staffs?.length > 0
                    ? staffs.map(({ name, id }) => ({
                      label: name,
                      value: name,
                      id,
                      key: id,
                    }))
                    : [{ label: 'no result found' }]
                  }
                  onSelect={handleSelectStaff}
                  onChange={(text) => {
                    setQuery({ sq: text });
                    }}
                  value={parsedQuery.sq}
                />
              </span>
              <Button
                onClick={handleClickAddNewStaff}
                size="middle"
                textSize="xs"
                text="Add a New Staff"
                textClassName="mr-2"
                className="ml-3"
              />
            </div>
          </div>);
        },
        // eslint-disable-next-line
        [loading,parsedQuery.sq],
    );

  const columns = React.useMemo(() => [{
    title: 'Mission Critical Competencies',
    key: 'competencyName',
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
        <div className="bg-white p-6 grid grid-cols-12  min-h-full">
          <div className="px-6 py-5 col-start-2 col-span-10">
            <div className="w-2/6">
              <Steps steps={['Ratee Details', 'Rater Selection']} currentPosition={0} />
            </div>
            <Table
              size="middle"
              renderHeader={renderHeader}
              className="p-6 mt-5 bg-white rounded-lg max-w-screen-xl"
              columns={columns}
              dataSource={rateeMissionCriticals}
              rowKey="competencyId"
              selectedRowKeys={selectedRows?.map((el) => el.competencyId.toString())}
              onRowSelectionChange={(_, rows) => {
                setSelectedRows(rows);
              }}
              pagination={false}
              loading={loading}
            />
            <div className="pt-23.5 pb-22 flex justify-end max-w-screen-xl">
              <Button
                className="w-24.5 h-9.5"
                type="link"
                text="Cancel"
               // onClick={}
              />
              <Button
                className="w-24.5 h-9.5"
                text="Next"
                onClick={handleClickNextStep}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    );
};

AddRatee.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRateeMissionCriticals: PropTypes.func.isRequired,
  addMissionCriticalToRatee: PropTypes.func.isRequired,
  rateeMissionCriticals: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchStaff: PropTypes.func.isRequired,
  staffs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStaff: PropTypes.func.isRequired,
  fetchOrganizationId: PropTypes.func.isRequired,
};

AddRatee.defaultProps = {};

export default AddRatee;
