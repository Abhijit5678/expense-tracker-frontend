import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, action }) => (
  <motion.header
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between"
  >
    <div>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </motion.header>
);

export default PageHeader;
