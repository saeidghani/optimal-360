import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import MainLayout from '../../Common/Layout';
import Menu from './Helper/Menu';
import Steps from '../../Common/Steps';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';
import Modal from '../../Common/Modal';
import { dynamicMap } from '../../../routes/RouteMap';
import { useQuery, stringify } from '../../../hooks/useQuery';

const RaterSelection = ({
  loading,
  fetchStaffForRater,
  staffForRater,
  fetchRaterGroups,
  raterGroups,
  clearRaterGroups,
  submitRaters,
  setSelectedRaters,
  selectedRaters,
  defaultSelectedRaters,
  clearSelectedAndDefault,
}) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const [discardModalVisible, setDiscardModalVisible] = useState(false);
  const [raterGroupRedirectId, setRaterGroupRedirectId] = useState(null);
  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const rateeId = parsedQuery?.rateeId;
  const projectId = parsedQuery?.projectId;
  const pageNumber = parsedQuery?.page_number;
  const raterGroupId = parsedQuery?.raterGroupId || raterGroups[0]?.id?.toString();

  const obj = {
    addRelations: [],
    removeRelations: [],
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Success',
      description: 'Your changes have been saved successfully!',
    });
  };

  useEffect(() => {
    fetchRaterGroups({ surveyGroupId });
    return () => {
      clearRaterGroups();
    };
  }, [surveyGroupId]);

  const setObjValue = () => {
    const addItems = selectedRaters?.filter((item) =>
      !defaultSelectedRaters?.find((el) => el.id === item.id)) || [];
    const removeItems = defaultSelectedRaters?.filter((item) =>
      !selectedRaters?.find((el) => el.id === item.id)) || [];
    removeItems.map((item) => obj.removeRelations.push(item.relationId));
    addItems.map((item) =>
      obj.addRelations.push({ raterId: item.id, raterGroupId: parseInt(raterGroupId) }),
    );
  };

  useEffect(() => {
    setObjValue();
    if (obj?.addRelations?.length > 0 || obj?.removeRelations?.length > 0) {
      submitRaters({ surveyGroupId, rateeId, obj }).then(() => {
        openNotificationWithIcon('success');
        setQuery({ page_number: 1 });
        clearSelectedAndDefault();
      });
    }
  }, [parsedQuery?.q]);

  useEffect(() => {
    setObjValue();
    if (obj.addRelations.length > 0 || obj.removeRelations.length > 0) {
      submitRaters({ surveyGroupId, rateeId, obj }).then(() => {
        openNotificationWithIcon('success');
      });
    }

    return () => {
      clearSelectedAndDefault();
    };
  },
    [submitRaters,
      parsedQuery?.page_size],
  );

  useEffect(() => {
    if (raterGroupId && parsedQuery?.page_size) {
      fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query });
      setQuery({ raterGroupId });
    }
  }, [fetchStaffForRater,
    query,
    raterGroupId,
    parsedQuery?.raterGroupId,
    parsedQuery?.pageSize,
    parsedQuery?.page_number,
  ]);

  useEffect(() => {
    if (!parsedQuery?.page_number || !parsedQuery?.page_size || !parsedQuery?.status) {
      setQuery({
        page_number: 1,
        page_size: 10,
        status: 'active',
        raterGroupId,
      });
    }
  }, [history?.location?.pathname]);

  const handleClickOnMenu = (id) => {
    setObjValue();
    if (id !== parsedQuery?.raterGroupId) {
      if (obj?.addRelations?.length > 0 || obj?.removeRelations?.length > 0) {
        setDiscardModalVisible(true);
        setRaterGroupRedirectId(id);
      } else {
        setQuery({ raterGroupId: id });
      }
    }
  };

  const handleSubmitClick = async () => {
    setObjValue();
    await submitRaters({ surveyGroupId, rateeId, obj });
    await clearSelectedAndDefault();
    setQuery({ raterGroupId: raterGroupRedirectId, page_number: 1 });
    setDiscardModalVisible(false);
  };

  const handleCancelClick = () => {
    clearSelectedAndDefault();
    setDiscardModalVisible(false);
    setQuery({ raterGroupId: raterGroupRedirectId });
  };

  const renderHeader = React.useCallback(() => {
    return (
      <div className="flex flex-row justify-start items-center">
        <div className="flex flex-row">
          <SearchBox
            onSearch={(e) => setQuery({ q: e.target.value, page_number: 1 })}
            className="text-xs"
            placeholder="Search"
            loading={loading}
            value={parsedQuery?.q || ''}
            onChange={(e) => setQuery({ q: e.target.value, pageNumber: 1 })}
          />
        </div>
      </div>
    );
  }, [loading, parsedQuery?.q]);

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
      <Modal
        className="w-56"
        visible={discardModalVisible}
        handleOk={handleSubmitClick}
        handleCancel={handleCancelClick}
        okText="Save"
        cancelText="Discard"
        okButtonProps={{ textClassName: 'px-4', loading }}
      >
        <div className="flex flex-col items-center">
          <InfoCircleOutlined className="text-4xl text-primary-500 mb-4" />
          <p>Your changes will be thrown away if you press Discard!</p>
        </div>
      </Modal>
      <div className="bg-white grid grid-cols-12 pl-15">
        <Menu
          onClick={(id) => handleClickOnMenu(id)}
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
            dataSource={staffForRater?.data}
            selectedRowKeys={selectedRaters?.map((el) => el.id)}
            onRowSelectionChange={(_, rows) => {
              setSelectedRaters(rows);
            }}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setQuery({ page_size: size, page_number: 1 });
            }}
            pageSize={pageSize * 1}
            pageNumber={pageNumber * 1}
            // eslint-disable-next-line camelcase
            onPaginationChange={(page_number, page_size) => {
              setQuery({
                page_size,
                page_number,
              });
            }}
            totalRecordSize={staffForRater?.metaData?.pagination?.totalRecords * 1}
          />
          <div className="pt-23.5 pb-22 flex justify-end max-w-screen-xl">
            <Button
              className="w-24.5 h-9.5"
              type="link"
              text="Prev"
              onClick={() => {
                const params = stringify({ projectId, surveyGroupId, rateeId });
                const path = `${dynamicMap.superUser.editRatee()}${params}`;
                history.push(path);
              }}
            />
            <Button
              className="w-24.5 h-9.5"
              text="Submit"
              onClick={async () => {
                try {
                  setObjValue();
                  await submitRaters({ surveyGroupId, rateeId, obj });
                  const params = stringify({ surveyGroupId, projectId });
                  const path = `${dynamicMap.superUser.ratersList()}${params}`;
                  history.push(path);
                } catch (error) { }
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
  staffForRater: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRaterGroups: PropTypes.func.isRequired,
  raterGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitRaters: PropTypes.func.isRequired,
  setSelectedRaters: PropTypes.func.isRequired,
  selectedRaters: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultSelectedRaters: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearRaterGroups: PropTypes.func.isRequired,
  clearSelectedAndDefault: PropTypes.func.isRequired,
};

RaterSelection.defaultProps = {};

export default RaterSelection;
