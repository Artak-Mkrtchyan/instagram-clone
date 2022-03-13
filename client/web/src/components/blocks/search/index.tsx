import React, { useState } from 'react';
import { Button } from 'src/components/uiElements/button';
import { CloseCircleIcon, SearchIcon } from 'src/components/uiElements/icons';
import { useInput } from 'src/hooks/useInput';
import styled from 'styled-components';

import { SearchUser, useSearch } from '@instcl/queries';

import { SearchList } from './search-list';
import { SearchLoader } from './search-loader';
import * as Styled from './styled';
import { Props } from './types';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 16px 0;
  max-height: 24px;
`;

export const ClearButton = styled(Button)`
  border: 0;
  color: #0095f6;
  display: inline;
  padding: 0;
  position: relative;
  background: 0 0;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  line-height: 18px;
`;

export const Dialog = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
`;

export const Search: React.FC<Props> = (props: Props) => {
  const term = useInput('');
  const [touched, setStatus] = useState<boolean>(false);
  const [users, setUsers] = useState<SearchUser[]>();
  const { search, loading } = useSearch();

  const searchUser = async (e) => {
    term.onChange(e);
    if (e.target.value) {
      let { data } = await search({ variables: { term: e.target.value } });

      setUsers(data.searchUser);
    }
  };

  console.log(users);

  return (
    <Styled.Wrapper>
      <Styled.Container>
        {touched ? (
          <>
            <Styled.SearchInput
              {...term}
              onChange={(e) => searchUser(e)}
              placeholder="Search"
            />
            {loading ? (
              <SearchLoader />
            ) : (
              <CloseCircleIcon onClick={() => setStatus(false)} />
            )}
          </>
        ) : (
          <Styled.SearchButton value="Search" onClick={() => setStatus(true)}>
            <SearchIcon />
          </Styled.SearchButton>
        )}
      </Styled.Container>
      {touched ? (
        <>
          <Dialog onClick={() => setStatus(false)} />
          <Styled.Popup>
            <Styled.PopupBody>
              <Styled.PopupCorner />
              <Styled.PopupContent>
                <Header>
                  <h4>Recent</h4>
                  <ClearButton value="Clear All" onClick={() => {}} />
                </Header>
                {users && users.length > 0 ? (
                  <SearchList searchedUser={users} />
                ) : (
                  <SearchLoader />
                )}
              </Styled.PopupContent>
            </Styled.PopupBody>
          </Styled.Popup>
        </>
      ) : (
        <></>
      )}
    </Styled.Wrapper>
  );
};
