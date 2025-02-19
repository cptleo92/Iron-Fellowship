import { Roll, ROLL_TYPE } from "../DieRollContext";
import { OracleRollSnackbar } from "./OracleRollSnackbar";
import { OracleTableRollSnackbar } from "./OracleTableRollSnackbar";
import { StatRollSnackbar } from "./StatRollSnackbar";

export interface RollSnackbarProps {
  roll: Roll;
  clearRoll: () => void;
  isMostRecentRoll: boolean;
}

export function RollSnackbar(props: RollSnackbarProps) {
  const { roll, clearRoll, isMostRecentRoll } = props;

  switch (roll.type) {
    case ROLL_TYPE.STAT:
      return (
        <StatRollSnackbar
          roll={roll}
          clearRoll={clearRoll}
          expanded={isMostRecentRoll}
        />
      );
    case ROLL_TYPE.ORACLE:
      return (
        <OracleRollSnackbar
          roll={roll}
          clearRoll={clearRoll}
          expanded={isMostRecentRoll}
        />
      );
    case ROLL_TYPE.ORACLE_TABLE:
      return (
        <OracleTableRollSnackbar
          roll={roll}
          clearRoll={clearRoll}
          expanded={isMostRecentRoll}
        />
      );
    default:
      return null;
  }
}
