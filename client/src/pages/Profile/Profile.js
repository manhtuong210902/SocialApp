import { Col, Container, Row } from 'react-bootstrap';
import About from '../../components/About/About';
import Avatar from '../../components/Avatar/Avatar';
import ListPost from '../../components/ListPost/ListPost';
import Photos from '../../components/Photos/Photos';

function Profile() {
    return (
        <Container>
            <Row>
                <Col>
                    <Avatar />
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={7}>
                    <ListPost isHome={false} />
                </Col>
                <Col xs={0} lg={5}>
                    <About />
                    <Photos />
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
