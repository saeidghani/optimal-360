import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../Common/Layout';
import Loading from '../../Common/Loading';
import Steps from '../../Common/Steps';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import { useQuery } from '../../../hooks';
import { stringify } from '../../../hooks/useQuery';
import { dynamicMap } from '../../../routes/RouteMap';

const EditRatee = ({
  loading,
  fetchRateeMissionCriticals,
  rateeMissionCriticals,
  addMissionCriticalToRatee,
}) => {
  const history = useHistory();
  const [parsedQuery] = useQuery();
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const rateeId = parsedQuery?.rateeId;
  const projectId = parsedQuery?.projectId;
  const [selectedRows, setSelectedRows] = useState([]);
  const defaultSelectedRows = rateeMissionCriticals?.filter((el) => el.isMissionCritical);

  useEffect(() => {
    setSelectedRows(defaultSelectedRows);
  }, [rateeMissionCriticals]);

  useEffect(() => {
    fetchRateeMissionCriticals({ surveyGroupId, rateeId });
    // TODO clear ratees
  }, [fetchRateeMissionCriticals]);

  const renderHeader = React.useCallback(() => {
    return (
      <div className="flex flex-row justify-start items-center">
        <p className="text-sm pl-6">Team Player</p>
      </div>
    );
  }, [loading]);

  const columns = React.useMemo(() => [
    {
      title: 'Mission Critical Competencies',
      key: 'competencyName',
    },
  ]);

  const handleClickNextStep = useCallback(async () => {
    const competencyIds = selectedRows.map((item) => item.competencyId);
    await addMissionCriticalToRatee({ surveyGroupId, rateeId, competencyIds });
    const params = stringify({ surveyGroupId, rateeId, projectId });
    const path = `${dynamicMap.superUser.raterSelection()}${params}`;
    history.push(path);
  }, [selectedRows]);

  return (
    <MainLayout
      title="Super User"
      breadCrumbItems={[
        'New Project',
        'Participants',
        'Status Details',
        'Add Ratee',
        'Ratee Details',
      ]}
      titleClass="mb-6 mt-3"
      contentClass="pt-6"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <div className="bg-white p-6 grid grid-cols-12  min-h-full">
        <div className="px-6 py-5 col-start-2 col-span-10">
          <div className="w-2/6">
            <Steps steps={['Ratee Details', 'Rater Selection']} currentPosition={0} />
          </div>
          <Table
            size="middle"
            renderHeader={renderHeader}
            className="p-6 mt-5 bg-white rounded-lg max-w-screen-xl"
            loading={loading}
            columns={columns}
            dataSource={rateeMissionCriticals}
            rowKey="competencyId"
            selectedRowKeys={selectedRows?.map((el) => el.competencyId)}
            onRowSelectionChange={(keys, rows) => {
              setSelectedRows(rows);
            }}
            pagination={false}
          />
          <div className="pt-23.5 pb-22 flex justify-end max-w-screen-xl">
            <Button
              className="w-24.5 h-9.5"
              type="link"
              text="Cancel"
              onClick={() => history.goBack()}
            />
            <Button className="w-24.5 h-9.5" text="Next" onClick={handleClickNextStep} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

EditRatee.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRateeMissionCriticals: PropTypes.func.isRequired,
  addMissionCriticalToRatee: PropTypes.func.isRequired,
  rateeMissionCriticals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

EditRatee.defaultProps = {};

export default EditRatee;
