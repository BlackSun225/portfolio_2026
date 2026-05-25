// lib/models/Project.ts
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelizeInstance } from '@/lib/sequelize'

interface ProjectAttributes {
  id: number
  title: string
  description: string
  urlPath: string
  imageUrl: string
  technologies: string[]
  createdAt?: Date
  updatedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> 
  implements ProjectAttributes {
  declare id: number
  declare title: string
  declare description: string
  declare urlPath: string
  declare imageUrl: string
  declare technologies: string[]
  
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    urlPath: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'url_path',
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image_url',
    },
    technologies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'Project',
    tableName: 'projects',
    underscored: true,
    // This makes Sequelize expect/use created_at and updated_at instead of createdAt/updatedAt
  }
)

export default Project