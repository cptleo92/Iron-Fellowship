import { ThemeContext } from "@emotion/react";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import { getHueFromString } from "../../functions/getHueFromString";
import { useCampaignStore } from "../../stores/campaigns.store";
import { CharacterDocument } from "../../types/Character.type";

export interface CharacterListProps {
  characters: { [key: string]: CharacterDocument };
  actions?: (characterId: string, index: number) => ReactNode;
  maxColumns?: number;
}

export function CharacterList(props: CharacterListProps) {
  const { characters, actions, maxColumns } = props;

  const minGridValue = maxColumns ? 12 / maxColumns : 4;

  const campaigns = useCampaignStore((store) => store.campaigns);

  return (
    <Grid container spacing={2}>
      {Object.keys(characters).map((characterId, index) => {
        const hue = getHueFromString(characterId);

        const { name, campaignId } = characters[characterId];

        return (
          <Grid
            item
            xs={12}
            sm={6 > minGridValue ? 6 : minGridValue}
            md={4 > minGridValue ? 6 : minGridValue}
            key={index}
          >
            <Card
              variant={"outlined"}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Box display={"flex"} alignItems={"center"} p={2}>
                  <Avatar
                    sx={{
                      backgroundColor: `hsl(${hue}, 60%, 85%)`,
                      color: `hsl(${hue}, 80%, 20%)`,
                    }}
                  >
                    {name[0]}
                  </Avatar>
                  <Box display={"flex"} flexDirection={"column"} ml={2}>
                    <Typography variant={"h6"}>{name}</Typography>

                    {campaignId ? (
                      <Typography
                        variant={"subtitle2"}
                        mt={-1}
                        color={(theme) => theme.palette.text.secondary}
                      >
                        {campaigns[campaignId]
                          ? campaigns[campaignId].name
                          : "Campaign: Loading"}
                      </Typography>
                    ) : null}
                  </Box>
                </Box>
              </Box>
              {actions && (
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={(theme) => ({
                    backgroundColor: theme.palette.grey[100],
                    color: "white",
                  })}
                >
                  {actions(characterId, index)}
                </Box>
              )}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
