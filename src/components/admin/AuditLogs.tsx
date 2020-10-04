import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    ListItemIcon,
    ListSubheader,
    Typography
} from "@material-ui/core";
import { ExpandMore, History } from "@material-ui/icons";
import React, { useState } from "react";
import { AuditLog, User } from "../../interfaces";

interface Props {
    logs: AuditLog[];
    users: User[];
    title?: string;
}

const AuditLogs: React.FC<Props> = ({ logs, users, title }: Props) => {
    const [expanded, setExpanded] = useState<string | undefined>(undefined);

    const handleChange = (panel: string, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : undefined);
    };

    return (
        <List
            component="div"
            aria-labelledby="audit-log-subheader"
            subheader={
                <ListSubheader id="audit-log-subheader" component="div" disableSticky>
                    {title}
                </ListSubheader>
            }
        >
            {logs.map(log => {
                const executor = users.find(user => user.id === log.executorId);

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
                            <Typography variant="h6">{`${executor?.username || "[deleted]"} ${
                                log.action
                            } ${log.collection}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2">Starred</Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </List>
    );
};

export default AuditLogs;
