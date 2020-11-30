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
  const [parsedQuery, query, setQuery] = useQuery();
  const [selectedPastResult, setSelectedPastResult] = React.useState({});
  const [inputtedPastResult, setInputtedPastResult] = React.useState({});
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const projectId = parsedQuery?.projectId;

  React.useEffect(() => {
    const params = stringify({ q: parsedQuery.sq });
    fetchPastResultOptions({ surveyGroupId, query: '' });
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
  const _pastResultOptions = React.useMemo(
    () => (pastResultOptions?.data || []).map((item) => ({ ...item })),
    // eslint-disable-next-line
    [pastResultOptions.timeStamp],
  );
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
      }) => {
        const options = _pastResultOptions.length > 0
          ? (
            _pastResultOptions?.filter((each) => (`${each.pastCompetencyId}${each.pastCompetencyName.toLowerCase()}${each.pastCompetencyYear}`)
              .includes(inputtedPastResult[competencyId]?.replaceAll('-', '').replaceAll(' ', '').toLowerCase()))
          ).map(({ pastCompetencyId, pastCompetencyName, pastCompetencyYear }) => ({
            label: `${pastCompetencyId} - ${pastCompetencyName} - ${pastCompetencyYear}`,
            value: `${pastCompetencyId} - ${pastCompetencyName} - ${pastCompetencyYear}`,
            pastCompetencyId,
            key: pastCompetencyId,
          }))
          : [{ label: 'no result found' }];

        return (
          <AutoComplete
            size="middle"
            loading={loading}
            placeholder="Inspiring & Motivating Others"
            options={options}
            onSelect={(a) => {
              console.log(a);
              // delete its input
              const newInput = { ...inputtedPastResult };
              delete newInput[competencyId];
              setInputtedPastResult(newInput);
              // select it
              setSelectedPastResult({ ...selectedPastResult, [competencyId]: a.label });
            }}
            onChange={(value) => {
              console.log(value?.toLowerCase());
              // // unSelect it
              const newSelect = { ...selectedPastResult };
              delete newSelect[competencyId];
              setSelectedPastResult(newSelect);
              // set New Value
              setInputtedPastResult({ ...inputtedPastResult, [competencyId]: value });
            }}
            value={inputtedPastResult[competencyId] ||
            (inputtedPastResult[competencyId] !== '' && (
                selectedPastResult[competencyId] ||
                (rowPastCompetencyId ? `${rowPastCompetencyId} - ${rowPastCompetencyName} - ${rowPastCompetencyYear}` : ''))
            )
            }
          />
        );
      }
      ,
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
