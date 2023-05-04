import { Col, Container, Row } from 'react-bootstrap';
import Banner from '../../components/Banner/Banner';
import Contacts from '../../components/Contacts/Contacts';
import ListPost from '../../components/ListPost/ListPost';

function Home() {
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Banner />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={7}>
                    <ListPost isHome={true} />
                </Col>
                <Col xs={0} md={5}>
                    <Contacts />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
