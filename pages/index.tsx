import React from 'react';


const SERVER: string = process.env.REACT_APP_SOCKET_URL;

interface Props {
  data: any;
}

const IndexPage: React.FC<Props> = ({ data }) => {
  return (
    <>
      <h1>
        Viktig
      </h1>
    </>
  );
};

export default IndexPage;
