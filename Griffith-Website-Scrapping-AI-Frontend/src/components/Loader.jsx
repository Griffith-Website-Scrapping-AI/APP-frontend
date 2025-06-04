// src/components/Loader.jsx
export default function Loader() {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.dot}></div>
      <div style={{ ...styles.dot, animationDelay: '0.2s' }}></div>
      <div style={{ ...styles.dot, animationDelay: '0.4s' }}></div>
    </div>
  );
}

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.3rem',
    margin: '1rem 0',
  },
  dot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    animation: 'bounce 0.8s infinite',
  },
};
