import React from "react";
import { Grid, Header, Table } from "semantic-ui-react";
import { ProfileCard } from "./ProfileCard";
import { getCompleteProfile } from "../network";
import MoonLoader from "react-spinners/MoonLoader";

const Profile = ({ person }) => {
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setProfile(null);
    if (person) {
      setLoading(true);
      getCompleteProfile(person.url)
        .then(setProfile)
        .then(() => setLoading(false));
    }
  }, [person]);

  const getSpecies = (profile) => {
    if (profile.species && profile.species[0]) return profile.species[0].name;
    return "undefined";
  };

  const renderProfile = (profile) => (
    <Grid className="Profile" padded>
      <Grid.Row centered>
        <Header as="h1">{profile.name}</Header>
      </Grid.Row>
      <Grid.Row divided columns={2}>
        <Grid.Column>
          <ProfileCard label="height" value={profile.height} />
          <ProfileCard label="weight" value={profile.mass} />
          <ProfileCard label="born" value={profile.birth_year} />
        </Grid.Column>
        <Grid.Column>
          <ProfileCard label="species" value={getSpecies(profile)} />
          <ProfileCard label="hair color" value={profile.hair_color} />
          <ProfileCard label="eye color" value={profile.eye_color} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Header as="h2">Films</Header>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Table compact>
          <Table.Body>
            {profile.films
              .sort((a, b) => a.episode_id - b.episode_id)
              .map((film) => (
                <Table.Row>
                  <Table.Cell
                    width={4}
                    content={`Episode ${film.episode_id}`}
                  />
                  <Table.Cell content={film.title} />
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Grid.Row>
      <Grid.Row centered>
        <Header as="h2">Starships</Header>
      </Grid.Row>
      <Grid.Row>
        <Table compact>
          <Table.Body>
            {profile.starships.map((ship) => (
              <Table.Row>
                <Table.Cell width={4} content={ship.name} />
                <Table.Cell content={ship.model} />
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid.Row>
    </Grid>
  );

  const loaderCss = `
    opacity: 0.7;
    filter: blur(3px);
    margin: 50px auto;
  `;
  const Loader = (
    <MoonLoader color="rgb(135, 220, 90)" size="200" css={loaderCss} />
  );

  if (profile) return renderProfile(profile);
  if (loading) return Loader;
  return null;
};

export default Profile;
