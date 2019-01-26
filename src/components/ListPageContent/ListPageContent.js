import React from "react";
import styled from "styled-components";
import ContentList from "../ContentList";
import Layout from "../../layout";
import Pagenation from "../Pagenation";
import PxtoRem from "../../modules/PxtoRem";

const Box = styled.div`
  /* margin-top: ${PxtoRem(25)}; */
  padding-top: ${PxtoRem(100)};
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  padding-left: 1rem;
  ${props => props.theme.Media.xlarge`position: absolute; padding-top: 0; padding-left: ${PxtoRem(620)}; height: 100vh;`}
  ${props => props.theme.Media.large`position: absolute; padding-top: 0; padding-left: ${PxtoRem(420)}; height: 100vh;`}
  ${props => props.theme.Media.desktop`position: absolute; padding-top: 0; padding-left: ${PxtoRem(270)}; height: 100vh;`}
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  // overflow-y: auto;
  position: relative;
  padding-right: 1rem;
  ${props => props.theme.Media.xlarge`padding-top: ${PxtoRem(20)};`}
  ${props => props.theme.Media.large`padding-top: ${PxtoRem(20)};`}
  ${props => props.theme.Media.desktop`padding-top: ${PxtoRem(20)};`}
`

const Content = styled.div`
  ${props => props.theme.Media.xlarge`width: ${PxtoRem(800)};`}
  ${props => props.theme.Media.large`width: ${PxtoRem(800)};`}
  ${props => props.theme.Media.desktop`width: ${PxtoRem(680)};`}
`

class ListPageContent extends React.Component {
    render() {
        const { edges, pathContext, siteMetadata } = this.props;
        const { current, postLimit, skip, totalPage, category, NavMenu } = pathContext;
        return (
          <Layout site={siteMetadata} NavMenu={NavMenu}>
            <Box>
                <Wrap>
                  <Content>
                    <ContentList list={edges} />
                    { totalPage > 0 && <Pagenation
                      current={current}
                      postLimit={postLimit}
                      skip={skip}
                      totalPage={totalPage}
                      category={category}
                    />}
                  </Content>
                </Wrap>
              </Box>
          </Layout>
        );
    }
}

export default ListPageContent;