import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Table from './Table';
import TableHeader from './Components/TableHeader';
import TableHeaderCell from './Components/TableHeaderCell';
import TableBody from './Components/TableBody';
import TableRow from './Components/TableRow';
import TableCell from './Components/TableCell';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';

import { PEOPLE_DATA_2 } from '../../demo/data';

function CustomCellTable() {
  return (
    <Table height="250px">
      <TableHeader mobileLabel="Contacts">
        <TableHeaderCell width="56px" />
        <TableHeaderCell width="300px">Name</TableHeaderCell>
        <TableHeaderCell>Contact</TableHeaderCell>
        <TableHeaderCell>Age</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {PEOPLE_DATA_2.map((row, index) => (
          <TableRow key={index}>
            <TableCell width="56px">
              <Icon
                name="profile-circle"
                size="24"
                className="neutral-300"
              />
            </TableCell>
            <TableCell width="300px">
              <Text size="4" bold>
                {row.name}
              </Text>
            </TableCell>
            <TableCell>
              <div className="mb-2">
                <a className="blue" href={`mailto:${row.email}`}>
                  {row.email}
                </a>
              </div>
              <div>{row.phone}</div>
            </TableCell>
            <TableCell>{row.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
function compare(key) {
  return function (a, b) {
    // property does not exist
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA =
      typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB =
      typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return comparison;
  };
}

function SortableTable() {
  const [nameSortDirection, setNameSortDirection] = useState('ASC');
  const [ageSortDirection, setAgeSortDirection] = useState(null);

  const handleSort = (title, prevDirection) => {
    let nextDirection = null;

    if (prevDirection === 'ASC') {
      nextDirection = 'DESC';
    }

    if (prevDirection === 'DESC') {
      nextDirection = 'ASC';
    }

    if (prevDirection === null) {
      nextDirection = 'ASC';
    }

    if (title === 'name') {
      setNameSortDirection(nextDirection);
      setAgeSortDirection(null);
      return;
    }

    if (title === 'age') {
      setNameSortDirection(null);
      setAgeSortDirection(nextDirection);
    }
  };

  const getSortedData = (DATA) => {
    if (nameSortDirection) {
      const sorted = DATA.sort(compare('name'));

      if (nameSortDirection === 'ASC') {
        return sorted;
      }

      if (nameSortDirection === 'DESC') {
        return sorted.reverse();
      }
    }

    if (ageSortDirection) {
      const sorted = DATA.sort(compare('age'));
      if (ageSortDirection === 'ASC') {
        return sorted;
      }

      if (ageSortDirection === 'DESC') {
        return sorted.reverse();
      }
    }
    return DATA;
  };

  return (
    <Table>
      <TableHeader mobileLabel="Contacts">
        <TableHeaderCell
          sortDirection={nameSortDirection}
          onSort={() => handleSort('name', nameSortDirection)}
        >
          Name
        </TableHeaderCell>
        <TableHeaderCell
          sortDirection={ageSortDirection}
          onSort={() => handleSort('age', ageSortDirection)}
        >
          Age
        </TableHeaderCell>
      </TableHeader>
      <TableBody>
        {getSortedData(PEOPLE_DATA_2).map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

storiesOf('Table', module)
  .addParameters({
    chromatic: { viewports: [479, 959, 1439] },
  })
  .add('tabular data', () => (
    <Table>
      <TableHeader mobileLabel="Contacts">
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Title</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Company</TableHeaderCell>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Vicki Rohlfs</TableCell>
          <TableCell>VP Marketing</TableCell>
          <TableCell>ntanslie1@example.com</TableCell>
          <TableCell>Acme Inc.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Stacy Mardlin</TableCell>
          <TableCell>Senior Cost Accountant</TableCell>
          <TableCell>smardlin2@example.com</TableCell>
          <TableCell>Acme Inc.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ))
  .add('custom cells', () => <CustomCellTable />)
  .add('sortable table', () => <SortableTable />);
