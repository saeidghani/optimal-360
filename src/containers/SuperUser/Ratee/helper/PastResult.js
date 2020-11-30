import React from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '../../../../hooks';

import Table from '../../../../components/Common/Table';
import AutoComplete from '../../../../components/Common/AutoComplete';
import Button from '../../../../components/Common/Button';

const PastResult = ({
                      loading,
                      fetchPastResultOptions,
                      fetchPastResult,
                      setPastResult,
                      pastResultOptions,
                      pastResult,
                    }) => {
  const [parsedQuery] = useQuery();

  // which Competency assigned new value:
  // format: competencyId:{pastCompetencyId - pastCompetencyName - pastCompetencyYear} []
  // for submitting form we want competencyId and pastCompetencyId,
  // but because of label we store all in this format. may not the best solution but it works currently!
  const [selectedPastResult, setSelectedPastResult] = React.useState({});
  // temporary Competency typed value:
  const [inputtedPastResult, setInputtedPastResult] = React.useState({});

  const surveyGroupId = parsedQuery?.surveyGroupId;
  const _pastResultOptions = pastResultOptions?.data || [];

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
    let options;
    const askingValue = inputtedPastResult[competencyId]
      ?.replaceAll('-', '')
      .replaceAll(' ', '')
      .toLowerCase(); // avoid this characters on searching

    if (_pastResultOptions.length > 0) {
      options = (_pastResultOptions?.filter((each) => (
          `${each.pastCompetencyId}${each.pastCompetencyName.toLowerCase()}${each.pastCompetencyYear}`
        ).includes(askingValue))
      ).map(({ pastCompetencyId, pastCompetencyName, pastCompetencyYear }) => ({
        value: `${pastCompetencyId} - ${pastCompetencyName} - ${pastCompetencyYear}`,
        key: pastCompetencyId,
      }));
    } else {
      options = [{ label: 'no result found' }];
    }

    return options;
  };

  const getValue = (competencyId, rowPastCompetencyId, rowPastCompetencyName, rowPastCompetencyYear) => {
    return inputtedPastResult[competencyId] || (
      inputtedPastResult[competencyId] !== '' && (
        selectedPastResult[competencyId] || (
          rowPastCompetencyId ?
            `${rowPastCompetencyId} - ${rowPastCompetencyName} - ${rowPastCompetencyYear}` :
            ''
        )
      )
    );
  };

  const handleSelect = (competencyId, item) => {
    // delete its input
    const newInput = { ...inputtedPastResult };
    delete newInput[competencyId];
    setInputtedPastResult(newInput);
    // select it
    setSelectedPastResult({ ...selectedPastResult, [competencyId]: item.value });
  };

  const handleChange = (competencyId, textValue) => {
    // // unSelect it
    const newSelect = { ...selectedPastResult };
    delete newSelect[competencyId];
    setSelectedPastResult(newSelect);
    // set New Value
    setInputtedPastResult({ ...inputtedPastResult, [competencyId]: textValue });
  };

  const handleSubmit = () => {
    const selectedPastResults = Object.entries(selectedPastResult).map(([competencyId, label]) => ({
      competencyId: parseInt(competencyId, 10),
      pastCompetencyId: parseInt(label.split(' -')[0], 10),
    }));
    setPastResult({ selectedPastResults, surveyGroupId });
  };

  const columns = React.useMemo(() => [
    {
      key: 'competencyName',
      title: 'Current Competency',
      width: 500,
      render: (id, _, index) => (
        <span>{index + 1}. {id}</span>
      ),
    },
    {
      key: 'competencyId',
      title: 'Past Competency',
      width: 500,
      render: (competencyId, {
        pastCompetencyId: rowPastCompetencyId,
        pastCompetencyName: rowPastCompetencyName,
        pastCompetencyYear: rowPastCompetencyYear,
      }) => (
        <div className="autocomplete-container">
          <AutoComplete
            loading={loading}
            placeholder="Inspiring & Motivating Others"
            options={getOptions(competencyId)}
            onSelect={(item) => {
              handleSelect(competencyId, item);
            }}
            onChange={(textValue) => {
              handleChange(competencyId, textValue);
            }}
            value={getValue(competencyId, rowPastCompetencyId, rowPastCompetencyName, rowPastCompetencyYear)}
          />
        </div>
      ),
    },
  ]);

  return (
    <>
      <Table
        size="middle"
        className="c-table-white-head bg-white"
        renderHeader={() => (<span style={{ marginTop: '-8px', display: 'block' }} />)}
        loading={loading}
        columns={columns}
        dataSource={pastResult?.data || []}
        rowKey="competencyId"
        rowSelection={false}
        pagination={false}
      />

      <Button
        loading={loading}
        onClick={handleSubmit}
        text="Submit"
        textSize="16px"
        className="ml-auto c-force-padding-y-px px-7 w-full sm:w-auto mt-20"
      />
    </>
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
