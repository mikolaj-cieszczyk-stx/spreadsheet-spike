import { Button, Link } from '@nextui-org/react'
import React from 'react'

interface NavProps {
  items: {
    title: string
    url: string
  }[]
}

const Nav: React.FC<NavProps> = ({ items }) => {
  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        {items.map((item, index) => (
          <div key={index}>
            <Link style={{}} href={item.url}>
              <Button
                style={{
                  color: 'white',
                  background: '#0064d7',
                  border: 0,
                  borderRadius: '4px',
                  padding: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
                key={index}
              >
                {item.title}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Nav
