// my-dashboard-component.jsx
import React, { useEffect, useState } from 'react';
import { ApiClient } from 'admin-bro';
import { ThemeProvider } from 'styled-components';
import {
  Button,
  theme,
  Box,
  Header,
  Text,
  Icon,
  Link,
} from '@admin-bro/design-system';
import { Section } from '@admin-bro/design-system';
import { CurrentUserNav } from '@admin-bro/design-system';
import { Illustration } from '@admin-bro/design-system';
import {
  DropDown,
  DropDownTrigger,
  DropDownMenu,
  DropDownItem,
} from '@admin-bro/design-system';

const api = new ApiClient();
const name = 'ClimateChange - Master Admin';
const userUrl = window.location.origin.toString() + '/admin/resources/User';
const discoverUrl =
  window.location.origin.toString() + '/admin/resources/Discover';
const charityUrl =
  window.location.origin.toString() + '/admin/resources/Charity';

const Dashboard = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box variant="grey">
        <Box bg="successDark" flex flexDirection="row">
          <Box width={1 / 3}>
            <Header.H2 paddingTop={100} paddingLeft={100}>
              Welcome To ClimateChange!
            </Header.H2>
          </Box>
          <Box flexShrink={0} width={1 / 3} marginTop={70}>
            <Illustration variant={'Moon'} width={600} height={200} />
          </Box>
        </Box>
        <Section>
          <Box flex flexDirection="row">
            <Box
              flexGrow={1}
              variant="grey"
              p="md"
              width={1 / 2}
              marginRight={10}
              boxShadow="cardHover">
              <Box>
                <Illustration variant={'Folders'} />
              </Box>
              <Box>
                <Header.H6>
                  The data contain here are user data, discover news data and
                  charities information data
                </Header.H6>
              </Box>
            </Box>
            <Box
              flexShrink={0}
              variant="grey"
              p="md"
              width={1 / 2}
              boxShadow="cardHover">
              <Box>
                <Illustration variant={'DocumentCheck'} />
              </Box>
              <Box>
                <Header.H6>
                  By click the left navigation bar or the mongoose section below
                  you can access the database. You are able to add, edit delete
                  and view data.
                </Header.H6>
              </Box>
            </Box>
          </Box>
        </Section>
        <Section>
          <Box variant="grey">
            <Box variant="white" flex flexDirection="row">
              <Box flexGrow={1}>
                <Header.H3>Mongoose</Header.H3>
              </Box>
              <Box flexShrink={0}>
                <DropDown>
                  <DropDownTrigger>
                    <Button>
                      <Icon icon="Archive" />
                      Data for ClimateChange
                    </Button>
                  </DropDownTrigger>
                  <DropDownMenu>
                    <DropDownItem>
                      <Link href={userUrl}>
                        <Icon icon="DataBase" />
                        User Information
                      </Link>
                    </DropDownItem>
                    <DropDownItem>
                      <Link href={discoverUrl}>
                        <Icon icon="DataBase" />
                        Discover news
                      </Link>
                    </DropDownItem>
                    <DropDownItem>
                      <Link href={charityUrl}>
                        <Icon icon="DataBase" />
                        Charities
                      </Link>
                    </DropDownItem>
                  </DropDownMenu>
                </DropDown>
              </Box>
            </Box>
          </Box>
        </Section>
      </Box>
      <CurrentUserNav name={name} />
    </ThemeProvider>
  );
};

export default Dashboard;
