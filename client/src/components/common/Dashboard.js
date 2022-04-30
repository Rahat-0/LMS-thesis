import React from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import adminIcon from "../../assets/adminIcon.ico";
import librarianIcon from "../../assets/librarianIcon.png";
import studentIcon from "../../assets/studentIcon.png";
import bookIcon from "../../assets/bookIcon.png";
const Dashboard = (props) => {
  const [data, loading] = props.data;
  const { visible, routes, title, links } = props;

  const styles = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div
      className={`flex flex-col pt-20 p-5 ${
        visible ? " ml-80 lg:w-9/12" : ""
      } `}
    >
      <div className={`${loading ? "block" : "hidden" } text-center`}> loading... </div>


      <div className=" w-full h-28 flex justify-between items-center bg-blue-50 rounded-t-md">
        <div>
          <div className="p-2 text-3xl">Dashboard</div>
          <div className="px-2 pb-2">{routes} / Dashboard</div>
        </div>
        <div></div>
      </div>
      <div className="-my-2 h-screen overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <animated.div
            style={styles}
            className="shadow  border-b border-gray-200 sm:rounded-lg flex"
          >
            <HeadCard
              imgs={adminIcon}
              count={data.admins || data.student}
              title={title.first}
              paths={links.first}
            />
            <HeadCard
              imgs={librarianIcon}
              count={data.librarians || data.deactiveuser}
              title={title.second}
              paths={links.second}
            />
            <HeadCard
              imgs={studentIcon}
              count={data.students || data.issuerequest}
              title={title.third}
              paths={links.third}
            />
            <HeadCard
              imgs={bookIcon}
              count={data.books}
              title={title.fourth}
              paths={links.fourth}
            />
          </animated.div>
        </div>
      </div>
    </div>
  );
};

const HeadCard = (props) => {
  const { imgs, count, title, paths } = props;
  const { number } = useSpring({
    from: { number: 0 },
    number: count,
    delay: 200,
    config: { duration: 2000 },
  });

  return (
    <Link
      to={paths}
      className="flex justify-center items-center space-x-2 w-3/12 h-32 m-3 rounded-tl-3xl transition rounded-br-3xl border-2 hover:shadow-2xl hover:bg-green-100"
    >
      <div className="w-12 h-auto m-2">
        <img src={imgs} alt="adminicon" />
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-600">
          <animated.div className="inline">
            {number.to((number) => number.toFixed())}
          </animated.div>
          +
        </p>
        <p className="text-gray-600 mt-1">{title}</p>
      </div>
    </Link>
  );
};

export default React.memo(Dashboard);
