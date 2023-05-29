import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react';
import Form from 'react-bootstrap/Form';

function TournamentMenu() {
  const [amtOfGroups, setAmtOfGroups] = useState(2);
  const [amtOfIndividuals, setAmtOfIndividuals] = useState(4);
  const [isTournamentInitialized, setTournamentInitialized] = useState(false);
  const [groups, setGroups] = useState<string[][]>([]);

  function handleGroupRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmtOfGroups(parseInt(event.target.value));
  }

  function handleIndividualRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmtOfIndividuals(parseInt(event.target.value));
  }

  function handleInitializeTournament() {
    const individuals = Array.from({ length: amtOfIndividuals }, (_, index) => `Individual ${index + 1}`);
    const groupedIndividuals = distributeIndividuals(individuals, amtOfGroups);
    setGroups(groupedIndividuals);
    setTournamentInitialized(true);
  }

  // Function to evenly distribute individuals among groups
  function distributeIndividuals(individuals: string[], numGroups: number): string[][] {
    const groups: string[][] = Array.from({ length: numGroups }, () => []);
    let groupIndex = 0;

    individuals.forEach((individual) => {
      groups[groupIndex].push(individual);
      groupIndex = (groupIndex + 1) % numGroups;
    });

    return groups;
  }

  return (
    <div>
      <h1>Tournament Menu</h1>
      <div>
        <br />
        Amount of groups: {amtOfGroups}
        <br />
        <Form.Range
          data-testid="group-range"
          min={2}
          max={4}
          onChange={handleGroupRangeChange}
          defaultValue={2}
        />
        <br />
        Amount of individuals: {amtOfIndividuals}
        <br />
        <Form.Range
          data-testid="individualRange"
          min={4}
          max={100}
          onChange={handleIndividualRangeChange}
          defaultValue={4}
        />
        <br />
        <button onClick={handleInitializeTournament}>Initialize Tournament</button>
				<br/>
        {isTournamentInitialized && (
          <div className={'TournamentMenu'}>
            <p>Tournament Initialized!</p>
            {groups.map((group, index) => (
              <div key={index}>
                <h3>Group {index + 1}</h3>
                <ul>
                  {group.map((individual, individualIndex) => (
                    <li key={individualIndex}>{individual}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TournamentMenu;
