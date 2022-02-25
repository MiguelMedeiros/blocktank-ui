import { Col, Container } from 'react-bootstrap';
import React, { ReactElement } from 'react';
import { selectCurrentPage, selectShowMenu } from '../../store/public-store';
import ConfigurePage from './configure';
import OrderPage from './order';
import OrdersPage from './orders';
import ConfirmationPage from './confirm';
import PaymentPage from './payment';
import ClaimPage from './claim';
import MenuPage from './menu';
import WidgetContainer from '../../components/widget-container';
import { useAppSelector } from '../../store/hooks';

import './index.scss';

const CardContainer = ({ children }): ReactElement => (
	<WidgetContainer>
		<Col xl={6} lg={5} md={4} sm={12} className={'infoCol'}>
			<h1>Lightning Network Services</h1>
			<br />
			<p>
				Open a connection to the Lightning Network and receive or send bitcoin instantly. Choose
				your custom capacity and BTC for your new channel, or paste a Lightning invoice to refill an
				existing channel.
			</p>
		</Col>

		<Col xl={6} lg={7} md={8} sm={12}>
			{children}
		</Col>
	</WidgetContainer>
);

const Page = (): JSX.Element => {
	const page = useAppSelector(selectCurrentPage);
	const showMenu = useAppSelector(selectShowMenu);

	if (showMenu) {
		return <MenuPage />;
	}

	switch (page) {
		case 'configure': {
			return <ConfigurePage />;
		}
		case 'confirm': {
			return <ConfirmationPage />;
		}
		case 'payment': {
			return <PaymentPage />;
		}
		case 'claim': {
			return <ClaimPage />;
		}
		case 'order': {
			return <OrderPage />;
		}
		default: {
			return <OrdersPage />;
		}
	}
};

function PublicPages(): JSX.Element {
	if (
		new URLSearchParams(window.location.search).get('embed') === 'true' ||
		(window as any).embedwidget === true
	) {
		return <Page />;
	}

	return (
		<Container className={'container'}>
			<CardContainer>
				<Page />
			</CardContainer>
		</Container>
	);
}

export default PublicPages;
