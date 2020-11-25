import React from 'react';
import PropTypes from "prop-types";
import { useQuery } from "../../../../hooks";

const PastResult = () => {
  const [parsedQuery, query, setQuery] = useQuery();

  const surveyGroupId = parsedQuery?.surveyGroupId;
  const projectId = parsedQuery?.projectId;

  return (<div>past result</div>);
};

PastResult.propTypes = {
  loading: PropTypes.bool.isRequired
};

PastResult.defaultProps = {};

export default PastResult;
