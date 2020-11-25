import React from 'react';
import PropTypes from "prop-types";
import { useQuery } from "../../../../hooks";

const ReportContent = () => {
  const [parsedQuery, query, setQuery] = useQuery();

  const surveyGroupId = parsedQuery?.surveyGroupId;
  const projectId = parsedQuery?.projectId;

  return (<div>report Content</div>);
};

ReportContent.propTypes = {
  loading: PropTypes.bool.isRequired
};

ReportContent.defaultProps = {};

export default ReportContent;
