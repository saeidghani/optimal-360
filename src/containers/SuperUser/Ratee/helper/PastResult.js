import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { useQuery } from '../../../../hooks';
import Table from '../../../../components/Common/Table';
import AutoComplete from '../../../../components/Common/AutoComplete';
import { dynamicMap } from '../../../../routes/RouteMap';
import { stringify } from '../../../../hooks/useQuery';

const PastResult = ({
                      loading,
                      fetchPastResultOptions,
                      fetchPastResult,
                      setPastResult,
                      pastResultOptions,
                      pastResult,
                    }) => {
  const [parsedQuery] = useQuery();
  const [selectedPastResult, setSelectedPastResult] = React.useState({});
  const [inputtedPastResult, setInputtedPastResult] = React.useState({});
  const surveyGroupId = parsedQuery?.surveyGroupId;

  React.useEffect(() => {
    fetchPastResultOptions({ surveyGroupId });
  }, [
    fetchPastResultOptions,
    surveyGroupId,
  ]);

  React.useEffect(() => {
    fetchPastResult({ surveyGroupId });
  }, [
    fetchPastResult,
    surveyGroupId,
  ]);

  const getOptions = (competencyId) => {
    const options = pastResultOptions?.data || [].length > 0
      ? (
        (pastResultOptions?.data || [])?.filter((each) => (`${each.pastCompetencyId}${each.pastCompetencyName.toLowerCase()}${each.pastCompetencyYear}`)
          .includes(inputtedPastResult[competencyId]?.replaceAll('-', '').replaceAll(' ', '').toLowerCase()))
      ).map(({ pastCompetencyId, pastCompetencyName, pastCompetencyYear }) => ({
        value: `${pastCompetencyId} - ${pastCompetencyName} - ${pastCompetencyYear}`,
        pastCompetencyId,
        key: pastCompetencyId,
      }))
      : [{ label: 'no result found' }];
    return options;
  };

  const getAutoCompleteValue = (competencyId, rowPastCompetencyId, rowPastCompetencyName, rowPastCompetencyYear) => {
    const value = inputtedPastResult[competencyId] ||
      (inputtedPastResult[competencyId] !== '' && (
          selectedPastResult[competencyId] ||
          (rowPastCompetencyId ? `${rowPastCompetencyId} - ${rowPastCompetencyName} - ${rowPastCompetencyYear}` : ''))
      );
    return value;
  };

  const handleSelect = (competencyId, item) => {
    console.log(item);
    // delete its input
    const newInput = { ...inputtedPastResult };
    delete newInput[competencyId];
    setInputtedPastResult(newInput);
    // select it
    setSelectedPastResult({ ...selectedPastResult, [competencyId]: item.value });
  };

  const handleChange = (competencyId, textValue) => {
    console.log(textValue?.toLowerCase());
    // // unSelect it
    const newSelect = { ...selectedPastResult };
    delete newSelect[competencyId];
    setSelectedPastResult(newSelect);
    // set New Value
    setInputtedPastResult({ ...inputtedPastResult, [competencyId]: textValue });
  };

  const columns = React.useMemo(() => [
    {
      key: 'competencyName',
      title: 'Current Competency',
      width: 200,
    },
    {
      key: 'competencyId',
      title: 'Past Competency',
      width: 200,
      render: (competencyId, {
        pastCompetencyId: rowPastCompetencyId,
        pastCompetencyName: rowPastCompetencyName,
        pastCompetencyYear: rowPastCompetencyYear,
      }) => (
        <AutoComplete
          size="middle"
          loading={loading}
          placeholder="Inspiring & Motivating Others"
          options={getOptions(competencyId)}
          onSelect={(item) => {
            handleSelect(competencyId, item);
          }}
          onChange={(textValue) => {
            handleChange(competencyId, textValue);
          }}
          value={getAutoCompleteValue(competencyId, rowPastCompetencyId, rowPastCompetencyName, rowPastCompetencyYear)}
        />
      ),
    },
  ]);

  return (
    <div>

      <Table
        size="middle"
        className="c-table-white-head p-6 mt-5 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        dataSource={pastResult?.data || []}
        rowKey="competencyId"
        rowSelection={false}
        pagination={false}
      />

      <button onClick={() => {
        console.log('pastResultOptions', pastResultOptions);
        console.log('inputtedPastResult', inputtedPastResult);
        console.log('selectedPastResult', selectedPastResult);
      }}
      >
        aaaaa
      </button>
    </div>
  );
};

PastResult.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchPastResultOptions: PropTypes.func.isRequired,
  fetchPastResult: PropTypes.func.isRequired,
  setPastResult: PropTypes.func.isRequired,
  pastResultOptions: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape(
        {
          pastCompetencyId: PropTypes.number,
          pastCompetencyName: PropTypes.string,
          pastCompetencyYear: PropTypes.number,
        },
      ),
    ),
  }),
  pastResult: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape(
        {
          competencyId: PropTypes.number,
          competencyName: PropTypes.string,
          pastCompetencyId: PropTypes.number,
          pastCompetencyName: PropTypes.string,
          pastCompetencyYear: PropTypes.number,
        },
      ),
    ),
  }),
};

PastResult.defaultProps = {
  pastResultOptions: {},
  pastResult: {},
};

export default PastResult;
