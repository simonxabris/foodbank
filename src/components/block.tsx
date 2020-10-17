import * as React from 'react';

interface BlockProps {
  children: React.ReactNode;
}

export function Block(props: BlockProps) {
  return (
    <>
    <div>
      {props.children}
    </div>
    <style jsx>{`
    div {
      border-radius: 40px;
      margin: 0 20px;
      padding: 10px 20px;
      box-shadow: 2.5px 2.5px 5px 0 rgba(0,0,0,0.1),-2.5px -2.5px 5px 0 rgba(0,0,0,0.1), 2.5px -2.5px 5px 0 rgba(0,0,0,0.1),-2.5px 2.5px 5px 0 rgba(0,0,0,0.1);
    }
    `}</style>
    </>
  )
}