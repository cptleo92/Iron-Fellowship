import {
  Button,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { D10Icon } from "assets/D10Icon";
import PinIcon from "@mui/icons-material/PushPin";
import { useState } from "react";
import { useUpdatePinnedOracle } from "api/user/settings/updatePinnedOracle";
import { useIsTouchDevice } from "hooks/useIsTouchDevice";
import TableIcon from "@mui/icons-material/ListAlt";

export interface OracleListItemProps {
  onRollClick: () => void;
  text: string;
  onOpenClick: () => void;
  pinned?: boolean;
}

export function OracleListItem(props: OracleListItemProps) {
  const { text, onRollClick, onOpenClick, pinned } = props;

  const isTouchDevice = useIsTouchDevice();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)
  ) {
    // ...
  }

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const { updatePinnedOracle, loading } = useUpdatePinnedOracle();

  return (
    <ListItem
      disablePadding
      sx={(theme) => ({
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
          "&:hover": {
            backgroundColor: theme.palette.action.selected,
          },
        },
      })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      secondaryAction={
        <>
          {(isHovering || isTouchDevice) && (
            <IconButton onClick={() => onOpenClick()}>
              <TableIcon />
            </IconButton>
          )}

          {(isHovering || isTouchDevice || pinned) && (
            <IconButton
              color={pinned ? "primary" : "default"}
              onClick={() =>
                updatePinnedOracle({ oracleName: text, pinned: !pinned })
              }
              disabled={loading}
            >
              <PinIcon />
            </IconButton>
          )}
        </>
      }
    >
      <ListItemButton
        onClick={() => onRollClick()}
        sx={{ pr: "96px!important" }}
      >
        <ListItemIcon>
          <D10Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
