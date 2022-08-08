import React, { Component, Fragment } from "react";
import OptionsForm from "./components/OptionsForm/index";
import { Modal, Button, IconCog, Input } from "vtex.styleguide";
import { orderFormConsumer } from "vtex.store-resources/OrderFormContext";
import axios from "axios";
import { getRootPath } from "../../utils/helpers";
import "./FOC.global.css";

class FOC extends Component {
  state = {
    showFOCModal: false,
    selectedReason: null,
    selectedReasonText: null,
    isMarketingUser: false,
    salesChannel: null,
    RMA: null,
    agentId: null,
    dataLoaded: false,
    urlParams: {},
    requiredOptionSelectedError: false
  };

  static schema = {
    title: "FOC",
    description: "FOC will be visible only in Sales Channel 3",
    type: "object",
    properties: {
      isVisible: {
        title: "Show?",
        type: "boolean",
        default: false
      }
    }
  };

  async componentDidMount() {
    const queryParams = window.location.search.replace("?", "");
    let urlParams = {};
    queryParams.split("&").map(param => {
      const p = param.split("=");
      urlParams[p[0]] = p[1];
    });
    this.setState({ urlParams });

    if (urlParams.rma && urlParams.agentId) {
      this.setState({ RMA: urlParams.rma, agentId: urlParams.agentId });
    }
    const session = (
      await axios({
        url: `${getRootPath}/api/sessions?items=*`
      })
    ).data;

    var channel,canImpersonate;
    channel = session.namespaces.store.channel;
    if(session.namespaces.impersonate){
      canImpersonate = session.namespaces.impersonate.canImpersonate;
    }

    /*  var {
        namespaces: {
          store: { channel },
          impersonate: { canImpersonate }
          }
        } = session;*/

    const sc = channel.value;
    const isMarketingUser = canImpersonate ? canImpersonate.value : false;

    if (isMarketingUser === "true" && sc.toString() === "4") {
      this.setState({
        isMarketingUser: true,
        salesChannel: 4
      });
    }
  }

  async componentDidUpdate() {
    const { orderFormId, customData } = this.props.orderFormContext.orderForm;
    const { urlParams } = this.state;
    if (orderFormId && !this.state.dataLoaded) {
      if (customData) {
        const focData = customData.customApps.find(c => c.id === "foc");
        if (focData && !urlParams.rma && !urlParams.agentId) {
          const focFields = focData.fields;
          this.setState({ RMA: focFields.rma, agentId: focFields.agentId });
        }
      }
      this.setState({ dataLoaded: true });
      if (urlParams.rma && urlParams.agentId) {
        this.setState({
          showFOCModal: true
        });
        await this.saveFOC();
      }
    }
  }

  closeFOCModal = () => {
    this.setState({
      showFOCModal: false
    });
  };

  saveFOC = async () => {
    const appName = "foc";
    const { orderFormId } = this.props.orderFormContext.orderForm;
    const { agentId, RMA, selectedReasonText } = this.state;
    const url = `${getRootPath}/api/checkout/pub/orderForm/${orderFormId}/customData/${appName}`;
    try {
      const response = (
        await axios({
          method: "put",
          url: url,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: JSON.stringify({
            reasonDescription: selectedReasonText
              ? selectedReasonText
              : "No reason",
            rma: RMA,
            agentId: agentId
          })
        })
      ).data;
      await this.props.orderFormContext.refetch();
      console.log(this.props.orderFormContext.orderForm);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  onReasonSelected = (reason, reasonText) => {
    this.setState({
      selectedReason: reason,
      selectedReasonText: reasonText
    });
  };

  showFOCManagement = () => {
    return this.state.isMarketingUser && this.state.salesChannel === 4;
  };

  openFOCModal = () => {
    this.setState({
      showFOCModal: true
    });
  };

  updateFOC = async () => {
    if(this.state.selectedReason !== null && this.state.selectedReason !== "" && this.state.selectedReasonText !== null && this.state.selectedReasonText !== "") {
      await this.saveFOC();
      this.setState({
        showFOCModal: false,
        requiredOptionSelectedError: false
      });
    } else {
      this.setState({
        requiredOptionSelectedError: true
      })
    }

  };

  renderBottomBar = (
    <div className="nowrap">
      <span className="ml4">
        <Button variation="primary" onClick={this.updateFOC}>
          Confirm
        </Button>
      </span>
    </div>
  );

  render() {
    const showIcon = this.showFOCManagement();
    if (this.props.isVisible) {
      return (
        <Fragment>
          {showIcon && (
            <div className="relative fr flex items-center">
              <Button variation="tertiary" icon>
                <span className="flex items-center">
                  <span className="relative gray">
                    <div
                      className="foc-management-button pointer relative"
                      onClick={this.openFOCModal}
                    >
                      <IconCog />
                      <div
                        className={`foc-notify ${
                          this.state.selectedReason ? "done" : "required"
                        }`}
                      >
                        &nbsp;
                      </div>
                    </div>
                  </span>
                </span>
              </Button>
            </div>
          )}

          <Modal
            isOpen={this.state.showFOCModal}
            title="FOC Reason"
            responsiveFullScreen
            centered
            bottomBar={this.renderBottomBar}
            onClose={this.closeFOCModal}
            showCloseIcon={false}
            closeOnEsc={false}
            closeOnOverlayClick={false}
          >
            <OptionsForm
              onReasonSelected={this.onReasonSelected}
              selectedOption={`${this.state.selectedReason}|${this.state.selectedReasonText}`}
              requiredOptionSelectedError={this.state.requiredOptionSelectedError}
            />

            <div className="mb5">
              <Input
                label="RMA"
                onChange={e => this.setState({ RMA: e.target.value })}
                value={this.state.RMA}
              />
            </div>

            <div className="mb5">
              <Input
                label="Agent ID"
                onChange={e => this.setState({ agentId: e.target.value })}
                value={this.state.agentId}
              />
            </div>
          </Modal>
        </Fragment>
      );
    } else {
      return <></>;
    }
  }
}

export default orderFormConsumer(FOC);