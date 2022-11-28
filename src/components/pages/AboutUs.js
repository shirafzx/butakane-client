import { Card, Grid, Text, Link } from "@nextui-org/react";
import '../css/page.css'
import AnimatedPage from "../AnimatedPage";
import lysist from '../assets/lysist.png'

const AboutUs = () => {
  return (
    <AnimatedPage>
    <div className="wrapper">
    <Card css={{ p: "$6", mw: "600px" }}>
      <Card.Header>
        <img
          alt="nextui logo"
          // src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          src={lysist}
          width="50px"
          height="50px"
        />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h3 css={{ lineHeight: "$xs" }}>
              Butakane
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>butakane@Developer</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>Front-End Developer : Sirasit Phongsuwankul</Text>
        <Text>Back-End Developer : Nonthawat Doypinit</Text>
        <Text>หากท่านไม่สุจริตท่านก็จะไม่ได้รับประโยชน์อะไรจากโปรแกรมนี้ !</Text>
      </Card.Body>
      <Card.Footer>
        <Link
          icon
          color="primary"
          target="_blank"
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
    </div>
    </AnimatedPage>
  );
}

export default AboutUs
