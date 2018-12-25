import React from "react";
import ContentItem from "../ContentItem";
import styled from "styled-components";
import PxtoRem from "../../modules/PxtoRem";

const List = styled.ul`
  width: 100%;
  li:last-child a {
    border-bottom: 0;
  }
`;

class ContentList extends React.Component {
  render() {
    return (
      <List className="clearFix">
        {this.props.list.map((item, index) => {
          return <ContentItem key={`ContentItem${index}`} item={item} />;
        })}
      </List>
    );
  }
}

export default ContentList;
