import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    List,
    ListItemIcon,
    ListSubheader,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ExpandMore, History, Note } from "@material-ui/icons";
import clsx from "clsx";
import { formatRelative } from "date-fns";
import React, { useState } from "react";
import { User } from "../../interfaces";
import { useAuditLogs, useUsers } from "../../lib/db";

interface Props {
    className?: string;
    users?: User[];
    title?: string;
    limit?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "50%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
}));

const AuditLogs: React.FC<Props> = ({ className, users, title, limit = 25 }: Props) => {
    const classes = useStyles();

    const { data: revalidatedUsers } = useUsers({
        initialData: users,
        where: users ? { opStr: "in", value: users.map(user => user.id) } : undefined
    });
    const { data: revalidatedAuditLogs, loading } = useAuditLogs({
        where: users
            ? { fieldPath: "executorId", opStr: "in", value: users.map(user => user.id) }
            : undefined,
        limit: limit
    });

    const [expanded, setExpanded] = useState<string | undefined>(undefined);

    const handleChange = (panel: string, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : undefined);
    };

    const noLogs = (
        <div className={clsx(classes.paper, classes.secondaryHeading)}>
            <Note fontSize="large" />
            No Audit Logs to display.
        </div>
    );

    const logsContent = revalidatedAuditLogs.length
        ? revalidatedAuditLogs.map(log => {
              const executor = revalidatedUsers.find(user => user.id === log.executorId);
              const executorName = executor?.username || "[deleted]";

              const description = `${executorName} ${log.action} ${log.collection}`;
              const formattedTimestamp = formatRelative(Date.parse(log.timestamp), Date.now());

              return (
                  <Accordion
                      key={log.id}
                      expanded={expanded === log.id}
                      onChange={(_event, isExpanded) => handleChange(log.id, isExpanded)}
                  >
                      <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls={`panel${log.id}-content`}
                          id={`panel${log.id}-header`}
                      >
                          <ListItemIcon>
                              <History />
                          </ListItemIcon>
                          <Typography className={classes.heading} variant="h6">
                              {description}
                          </Typography>
                          <Typography className={classes.secondaryHeading} variant="h6">
                              {formattedTimestamp}
                          </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                          <Typography variant="body2">{description}</Typography>
                      </AccordionDetails>
                  </Accordion>
              );
          })
        : noLogs;

    return (
        <List
            component="div"
            className={className}
            aria-labelledby="audit-log-subheader"
            subheader={
                <ListSubheader id="audit-log-subheader" component="div" disableSticky>
                    {title}
                </ListSubheader>
            }
        >
            {loading ? (
                <div className={classes.paper}>
                    <CircularProgress />
                </div>
            ) : (
                logsContent
            )}
        </List>
    );
};

export default AuditLogs;
