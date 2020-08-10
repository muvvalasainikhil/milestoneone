import React from "react";
import DashboardContent from "./DashboardContent";
import { Pie, Bar } from "react-chartjs-2";
import "./parentdahsboard.css";
import axios from "axios";
class ParentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      selectedData: [],
      charData: {},
    };
  }
  componentWillMount() {
    if (localStorage.getItem("loggedIn") === null) {
      this.props.history.push("/");
    }
  }
  dashboardform = (category) => {
    axios.get("http://localhost:3000/allProduct/?q=" + category).then((res) => {
      let titles = [];
      var stocks = [];
      console.log(res.data);
      this.setState({ selectedData: res.data });
      this.state.selectedData.map((cat) => {
        return titles.push(cat.name);
      });
      this.state.selectedData.map((cat) => {
        return stocks.push(parseInt(cat.stock));
      });
      console.log(titles);
      this.setState({
        charData: {
          labels: [...titles],
          datasets: [
            {
              label: "Stock Availability",
              data: [...stocks],
              backgroundColor: [
                "rgba(225,99,132,0.6)",
                "rgba(225,206,86,0.6)",
                "rgba(54,162,235,0.6)",
                "rgba(75,192,192,0.6)",
                "rgba(153,102,255,0.6)",
                "rgba(225,159,64,0.6)",
                "rgba(225,99,132,0.6)",
              ],
            },
          ],
        },
      });
    });
    console.log(category);
    console.log(this.state.charData);
  };
  render() {
    return (
      <div className="dashboard">
        <div>
          <DashboardContent
            parentcategory={this.dashboardform}
          ></DashboardContent>
        </div>
        <div>
          <h1>Chart</h1>
          <Pie
            data={this.state.charData}
            height={80}
            options={{
              title: {
                display: true,
                text: "Stock Availability of selected Category",
              },
              legend: {
                display: true,
                position: "top",
              },
            }}
          ></Pie>
        </div>
      </div>
    );
  }
}

export default ParentDashboard;
// ss
