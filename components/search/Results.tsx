import PropTypes from 'prop-types';
import { Container, Card, Grid, Image, Text, Spacer, Row, Col } from '@nextui-org/react';
import { SearchResult } from '../../lib/types/Search';

const Result = ({hit} : {hit: SearchResult}) => {
  return (
    <>
      <Text h5>{hit.name}</Text>
    </>
  );
}

Result.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Result;