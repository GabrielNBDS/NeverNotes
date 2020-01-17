import React from "react";
import { Button, Column, Tag, Title, List } from "rbx";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ListNotes = props => {
  return (
    <>
      <Column.Group breakpoint="mobile">
        <Column size={6} offset={1}>
          <Title size={6}>{props.notes.length} Notas</Title>
          <Column size={2}>
            <Button
              state="active"
              color="custom-purple"
              outlined
              size="small"
              onClick={() => props.createNote()}
            >
              Notes +
            </Button>
          </Column>
        </Column>
      </Column.Group>
      <List className="notes-list">
        {props.notes.map((item, key) => (
          <List.Item
            key={key}
            onClick={() => props.selectNote(item._id)}
            active={item == props.current_note}
          >
            <Title size={6}>
              {item.title.replace(/(<([^>]+)>)/gi, "").substring(0, 15)}
            </Title>
            <Title size={6} subtitle spaced={false}>
              {item.body.replace(/(<([^>]+)>)/gi, "").substring(0, 30)}
            </Title>

            <Column.Group breakpoint="mobile">
              <Column size={10}>
                <Tag color="dark">
                  {Moment(item.created_at).format("DD/MM")}
                </Tag>
              </Column>
              <Column size={2}>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => props.deleteNote(item)}
                  color="grey"
                />
              </Column>
            </Column.Group>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default ListNotes;
