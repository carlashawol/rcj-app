import React, { useState, useRef } from "react";
import {
 TextField,
 Table,
 TableCell,
 TableBody,
 TableHead,
 TableRow
} from "@mui/material";

const data = [
  {
    id: 1,
    name: "tom1"
  },
  {
    id: 2,
    name: "tom2"
  },
  {
    id: 3,
    name: "tom3"
  },
  {
    id: 4,
    name: "mike"
  }
];
const Demo = () => {
  const key = useRef(null);
  const [word, setWord] = useState("");
  const focusText = (id, name) => {
    setWord(name);
  };

  return (
    <>
      <TextField
        style={{ width: "100%" }}
        id="outlined-basic"
        variant="outlined"
        value={word}
        size="small"
        color="primary"
        ref={key}
        onChange={e => {
          setWord(e.target.value);
        }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          data.map(item => (
            <TableRow key={item.id}>
              <TableCell align="left">
                <p style={{ fontSize: "13px", margin: "0px" }}>{item.id}</p>
              </TableCell>
              <TableCell align="left">
                <p style={{ fontSize: "13px", margin: "0px" }}>{item.name}</p>
              </TableCell>
              <TableCell>
                <button onClick={() => focusText(item.id, item.name)}>edit</button>{" "}
              </TableCell>
            </TableRow>
          ))
        }</TableBody>
      </Table>
    </>
  );
};
export default Demo;