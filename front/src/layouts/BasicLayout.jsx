import PropTypes from 'prop-types';

const BasicLayout = ({ children }) => {
  return (
    <>
      <header className="">
        <h1 className="">Header</h1>
      </header>

      <div className="">
        <main className="">
          {children}
        </main>

        <aside className="">
          <h1 className="">Slidebar</h1>
        </aside>
      </div>
    </>
  );
};

// PropTypes를 이용한 children 검증 추가
BasicLayout.propTypes = {
  children: PropTypes.node.isRequired, // children은 React 노드이며 필수임
};

export default BasicLayout;
